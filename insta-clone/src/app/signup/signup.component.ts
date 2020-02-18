import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements AfterViewInit {

  constructor(private sendReq: SendHttpRequestService) { }
  
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('instaHandle', {static: false}) instaHandle: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  res: any;
  ngAfterViewInit(){

  }
  signup(){
    let userObj = {
      name: this.name.nativeElement.value,
      instaHandle: this.instaHandle.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    }
    console.log(userObj);
    this.sendReq.signMeUp(userObj).subscribe(res => this.res = res);
    console.log(this.res);
    // if(this.res.status == '200'){
    //   console.log("Signed UP");
    // }
  }
}