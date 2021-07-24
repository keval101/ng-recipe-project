import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _authService:AuthService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  isLoginMode = false;
  isLoading = false;
  isError = false;
  isLogged = false;
  error:string = '';

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm:NgForm){

    if(!authForm.valid){ return; }


    const email =  authForm.value.email
    const password =  authForm.value.password

    let ObsResponse: Observable<AuthResponse>;


    this.isLoading = true;
    if(this.isLoginMode){
      //..LoginMode 
      ObsResponse = this._authService.login(email, password)

    } else {
      //..SignUpMode
       ObsResponse = this._authService.signup(email,password)
    }

    ObsResponse.subscribe( 
      resData => {
        console.log(resData)
        this.isLoading = false;
        this.isError = false
        this.toastr.success('You are Logged In !', 'Successfull !');
        this.router.navigate(['/recipes'])
      },
      errorMessage => {

        console.log(errorMessage)

        this.isError = true
        this.toastr.error(errorMessage, 'Error Occured!');

        this.error = errorMessage
        
        setTimeout( () => this.isError=false , 3000)
          
          this.isLoading = false;
      }
    )

    authForm.reset()
  }
}
