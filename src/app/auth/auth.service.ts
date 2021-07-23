import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
    }
    )
  }
}
