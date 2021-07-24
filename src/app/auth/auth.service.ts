import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.Model';


export interface AuthResponse{
  idToken	:string,
  email	: string,
  refreshToken : string,
  expiresIn	: string,
  localId	: string
  registered?:boolean,
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userStore = new Subject<User>()

  constructor(private http:HttpClient) { }

  //----------------------- SIGN UP METHOD -----------------------

  signup(email:string, password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPhD5h6D_3Biw6o0VEOAT3MAd12vF_8S0',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      catchError(this.errorHandling),
      tap( resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    )
  }

  //----------------------- LOGIN METHOD -----------------------

  login(email:string, password){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPhD5h6D_3Biw6o0VEOAT3MAd12vF_8S0', {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      catchError(this.errorHandling),
      tap( resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    )
  }

//----------------------- USER STORE -----------------------

private handleAuthentication ( email:string, userId:string, idToken:string, expiresIn:number){

  const expirationDate = new Date ( new Date().getTime() + expiresIn * 1000)
  const user = new User ( email, userId, idToken, expirationDate )
  this.userStore.next(user)
}

//----------------------- ERROR HANDLING -----------------------

  private errorHandling(errorRes : HttpErrorResponse){
    let errorMessage = ' An unknown Error Ocured !'

        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage)
        }
        
        switch( errorRes.error.error.message){
          case 'EMAIL_EXISTS' : 
            errorMessage = 'This email is already exists';
            break;
          case 'OPERATION_NOT_ALLOWED' : 
            errorMessage = 'Password sign-in is disabled for this project.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER' : 
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This is email not found'
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct'
            break;
          case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator'
            break;

        }
        return throwError(errorMessage)
  }
}
