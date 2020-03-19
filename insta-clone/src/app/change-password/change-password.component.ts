import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  instaHandle:string;

  constructor(private sendReq: SendHttpRequestService, private _router:Router) { }

  ngOnInit() {
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    console.log(loggedinUserId, "------->>>>>> current route pass")
    this.loadUserData(loggedinUserId,null);
  }

  loadUserData(id:string=null, instaHandle:string=null){
    this.sendReq.userInfo(id,instaHandle).subscribe(res => {
      if(res.status == 200){
        console.log(res.body[0]);
        console.log(res.status, res.body[0], "hiiii")
        this.instaHandle = res.body[0].instaHandle;
        
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
      
    });
  }

}
