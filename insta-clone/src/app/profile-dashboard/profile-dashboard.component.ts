import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService) { }

  name:string;
  username:string;
  followers:number;
  following:number;
  posts: number;
  bio:string;
  loggedinUserId: string;
  usersArray: any;
  
  ngOnInit() {
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
    this.loadUserData(loggedinUserId);
    // this.loadPosts();
  }

  loadPosts(){
    // this.sendReq.
  }

  loadUserData(id: string){
    this.sendReq.userInfo(id).subscribe(res => {
      if(res.status == 200){
        console.log(res.body[0]);
        this.usersArray = res.body[0];
        this.setUserData();
      }
      // else if(res.status == 401){
      //   localStorage.removeItem("token");
      //   this._router.navigate(['/login']);
      // }
      
    });
  }

  setUserData(){
    this.name = this.usersArray.name;
    this.username = this.usersArray.instaHandle;
    this.followers = this.usersArray.followers;
    this.following = this.usersArray.following;
    this.posts = this.usersArray.postsCount;
    this.bio = this.usersArray.about;
  }

}
