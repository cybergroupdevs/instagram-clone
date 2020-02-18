import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(
    private sendReq: SendHttpRequestService,
    private _router: Router) { }

  @ViewChild('instaHandle', {static: false}) instaHandle: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  res: any;

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
  
  ngAfterViewInit(){

  }

}
