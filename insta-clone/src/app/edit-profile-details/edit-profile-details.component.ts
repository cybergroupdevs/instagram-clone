import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-details',
  templateUrl: './edit-profile-details.component.html',
  styleUrls: ['./edit-profile-details.component.css']
})
export class EditProfileDetailsComponent implements OnInit {

  
  constructor(private sendReq: SendHttpRequestService, private _router:Router) { }

  @ViewChild('uname', {static: false}) uname: ElementRef;
  @ViewChild('uinstaHandle', {static: false}) uinstaHandle: ElementRef;
  @ViewChild('uabout', {static: false}) uabout: ElementRef;
  @ViewChild('uphone', {static: false}) uphone: ElementRef;
  @ViewChild('uprofileImage', {static: false}) uprofileImage: ElementRef;
  @ViewChild("uwebsite", {static:false}) uwebsite:ElementRef;
  @ViewChild("ugender", {static:false}) ugender:ElementRef;
  @ViewChild('uemail', {static: false}) uemail: ElementRef;
  @ViewChild('updateButton', {static: false}) updateButton: ElementRef;

  res: any;
  usersData:any;
  name:string
  username:string;
  bio:string;
  email:string;
  phone:Number;
  gender:string;
  profileImage:any
  website:string;
  
  ngOnInit() {
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    this.loadUserData(loggedinUserId, null)
    
  }
  update(){
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    let userObj = {
      name: this.uname.nativeElement.value,
      instaHandle: this.uinstaHandle.nativeElement.value,
      about: this.uabout.nativeElement.value,
      phone: this.uphone.nativeElement.value,
      email: this.uemail.nativeElement.value,
      // profileImage: this.uprofileImage.nativeElement.value,
      website: this.uwebsite.nativeElement.value,
      // gender: this.ugender.nativeElement.value,
     
      
    }

    this.sendReq.updateData(userObj,loggedinUserId).subscribe(res =>  {
      if(res.status == 200){
        console.log('Successful update!!');

      }
      else if(res.status == 406){
        let message="Username is already in use!" 
        console.log(message);
      }
      else if(res.status == 401){
        alert("Unauthorized");
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  loadUserData(id: string=null, instaHandle:string=null){
    console.log("loadingggggg")
    this.sendReq.userInfo(id, null).subscribe(res => {
      if(res.status == 200){
        console.log(res.body[0]);
        this.usersData = res.body[0];
        this.setUserData();
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
      
    });
  }

  setUserData(){

    this.name = this.usersData.name;
    this.username = this.usersData.instaHandle;
    console.log(this.usersData.email, "emaillll", this.usersData,)
    this.email = this.usersData.email;
    this.phone = this.usersData.phone;
    this.bio = this.usersData.about;
    this.profileImage = this.usersData.profileImage;
    this.website = this.usersData.website;
    this.gender = this.usersData.gender;
        
  }

}
