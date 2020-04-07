
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
  isVisible : boolean = false;

  constructor(private sendReq: SendHttpRequestService, private _router:Router) { }

  changePAssword(form){
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    this.sendReq.ChangePassword(form.value, loggedinUserId).subscribe(res=>{

      if (res.status==200){
        this.message = res.body.message;
        this.isVisible = true
        setTimeout(() =>{
          this.isVisible=false;
        },2000)
        form.reset()
        
      }
      else if (res.status==400){
        this.message = res.error.message;
        this.isVisible = true
        setTimeout(() =>{
          this.isVisible=false;
        },2000)
      }

      else if (res.status == 401) {
        alert("Unauthorized");
        localStorage.removeItem("token");
        this._router.navigate(["/login"]);
      
      }
    })
    
  }

}
