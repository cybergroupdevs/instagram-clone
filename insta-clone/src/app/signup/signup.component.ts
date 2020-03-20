import { LoginComponent } from './../login/login.component';
import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements AfterViewInit {

  constructor(private sendReq: SendHttpRequestService, private _router: Router, private  LoginComponent : LoginComponent) { }
  
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('instaHandle', {static: false}) instaHandle: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  res: any;
  message : String='';
  ngAfterViewInit(){

  }
  signup(){
    let userObj = {
      name: this.name.nativeElement.value,
      instaHandle: this.instaHandle.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    }
    this.sendReq.signMeUp(userObj).subscribe(res => 
    {
      
      if(res.body.success == true){
        this.message="Signed Up!!"
        console.log(this.message, res.status)
        
        this.LoginComponent.loginFunction({"instaHandle":userObj.instaHandle, "password":userObj.password})
      }
      else{
        this.message = res.body.message
      }
    })
  }

  

}