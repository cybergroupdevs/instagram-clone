
import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  {
  
  instaHandle:string;
  message:string;

  constructor(private sendReq: SendHttpRequestService, private _router:Router) { }

  changePAssword(form){
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    this.sendReq.ChangePassword(form, loggedinUserId).subscribe(res=>{
      console.log(res, "response")
      if (res.status==200){
        this.message = res.body.message;
        console.log(this.message, "messs1")
      }
      else if (res.status==400){
        this.message = res.error.message;
        console.log(this.message, "mess2")
      }

      else if (res.status == 401) {
        alert("Unauthorized");
        localStorage.removeItem("token");
        this._router.navigate(["/login"]);
      
      }


    })
  }

  

}
