import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
  }

  isLoginMode = false;
  isLoading = false;
  isError = false;
  error:string = '';

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm:NgForm){

    if(!authForm.valid){
      return;
    }
    const email =  authForm.value.email
    const password =  authForm.value.password

    this.isLoading = true;
    if(this.isLoginMode){
      //..LoginMode 
    } else {
      //..SignUpMode
        this._authService.signup(email,password).subscribe(
          resData => {
            console.log(resData)
            this.isLoading = false;

          }, error => {
            console.log(error)
            this.isError = true;
            this.error = "Error Occured !";

            setTimeout( () => this.isError=false , 3000)
              
              this.isLoading = false;
          })
    }



    authForm.reset()
  }
}
