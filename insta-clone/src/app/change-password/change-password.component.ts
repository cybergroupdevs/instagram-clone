
import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';
import { Router } from '@angular/router';
import { BufferToImage } from '../utils/bufferToImage';
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  {
  
  instaHandle:string;
  message:string;
  isVisible : boolean = false;
  image:any;
  userData:any;

  constructor(private sendReq: SendHttpRequestService, private _router:Router, private domSanitizer: DomSanitizer) { }

  ngOnInit(){
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token"))
      .data._id;
    this.loadUserData(loggedinUserId, null);
  }

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
  loadUserData(id: string = null, instaHandle: string = null) {
    this.sendReq.userInfo(id, null).subscribe(res => {
      if (res.status == 200) {
        this.userData = res.body.user;
        this.image = res.body.bufferedImage ? BufferToImage.bufferToImage(res.body.bufferedImage, this.domSanitizer): null;
        this.instaHandle = this.userData.instaHandle;
      } else if (res.status == 401) {
        localStorage.removeItem("token");
        this._router.navigate(["/login"]);
      }
    });
  }
  
    

}
