import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { BindOptions } from 'dgram';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(
    private sendReq: SendHttpRequestService,
    private _router: Router) { }

  res: any;
  warningText : string;
  warning : boolean = false;

  loginFunction(userObj) { 
    this.sendReq.logMeIn(userObj).subscribe(res => {
      
      if(res.status == 200){
        localStorage.setItem("token", res.body.token);
        this._router.navigate(['/feed']);
      }
      else if (res.status == 401){
        console.log(res, "response")
        this.warningText = res.error.message ;
        this.warning = true;
      }
    });
  }
}
