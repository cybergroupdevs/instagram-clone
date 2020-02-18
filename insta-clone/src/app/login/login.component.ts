import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService) { }
  loginFunction() { 
   
 }
  
  ngOnInit() {
  }

}
