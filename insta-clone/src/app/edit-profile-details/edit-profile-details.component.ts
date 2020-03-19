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
  @ViewChild('name', {static: false}) uname: ElementRef;
  @ViewChild('instaHandle', {static: false}) uinstaHandle: ElementRef;
  @ViewChild('about', {static: false}) uabout: ElementRef;
  @ViewChild('phone', {static: false}) uphone: ElementRef;
  @ViewChild('profileImage', {static: false}) uprofileImage: ElementRef;
  @ViewChild('email', {static: false}) uemail: ElementRef;
  @ViewChild('password', {static: false}) upassword: ElementRef;

  res: any;
  usersData:any;
  name:string
  username:string;
  bio:string;
  email:string;
  phone:Number;
  gender:string;
  profileImage:any

  ngOnInit() {
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    this.loadUserData(loggedinUserId,null)
    
  }
  update(){
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id;
    let userObj = {
      name: this.uname.nativeElement.value,
      instaHandle: this.uinstaHandle.nativeElement.value,
      about: this.uabout.nativeElement.value,
      phone: this.uphone.nativeElement.value,
      profileImage: this.uprofileImage.nativeElement.value,
      email: this.uemail.nativeElement.value,
      password: this.upassword.nativeElement.value
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

  loadUserData(id: string=null,instaHandle:string=null){
    this.sendReq.userInfo(id,null).subscribe(res => {
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
    this.email = this.usersData.email;
    this.phone = this.usersData.phone;
    this.gender = this.usersData.gender;
    this.bio = this.usersData.about;
    this.profileImage = this.usersData.profileImage;
    
  }
  readURL() {
    const preview = document.getElementById('profilePic') as HTMLImageElement;
    const file = (<HTMLInputElement>document.getElementById('profileImageInput')).files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = String(reader.result);
      console.log(reader.result)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
  }
}

//   readURL3(input){
//     const preview = document.getElementById('profilePic');
//     const file = document.querySelector('input[type=file]').files[0];
//     const reader = new FileReader();

//     reader.addEventListener("load", function () {
//       preview.src = reader.result;
//     }, false);

//     if (file) {
//       reader.readAsDataURL(file);
//     }
// }





  

}
