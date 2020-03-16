import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements AfterViewInit {

  constructor(private sendReq: SendHttpRequestService, private _router: Router) { }
  
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
    
    console.log(userObj, "userObj------>>>>");
    this.sendReq.signMeUp(userObj).subscribe(res => 
    {
    console.log(res, "res------->>>>>");
    if(res !=null){
      console.log("Signed UP");
      this.message="Signed Up!!"
      this.loginFunction()
    }
    })

  }

  loginFunction() { 
    let userObj = {
      instaHandle: this.instaHandle.nativeElement.value,
      password: this.password.nativeElement.value
    }
    console.log(userObj);
    this.sendReq.logMeIn(userObj).subscribe(res => {
      console.log(res);
      if(res != null){
        localStorage.setItem("token", res);
        this._router.navigate(['/feed']);
      }
    });
  }

}