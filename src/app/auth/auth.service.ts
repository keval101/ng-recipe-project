import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface AuthResponse{
  idToken	:string,
  email	: string,
  refreshToken : string,
  expiresIn	: string,
  localId	: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(email:string, password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPhD5h6D_3Biw6o0VEOAT3MAd12vF_8S0',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      catchError( errorRes => {
        let errorMessage = ' An unknown Error Ocured !'

        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage)
        }
        
        switch( errorRes.error.error.message){
          case 'EMAIL_EXISTS' : 
          errorMessage = 'This email is already exists';
        }
        return throwError(errorMessage)
      })
    )
  }
}
