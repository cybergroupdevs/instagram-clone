import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService, private _router:Router) { }

  name:string;
  username:string;
  followers:number;
  following:number;
  posts: number;
  bio:string;
  loggedinUserId: string;
  usersArray: any;
  followersArray=[]
  followingArray=[]
  isVisible : Boolean=true
  
  ngOnInit() {
    let current_route = this._router.url.split("/");
    console.log(current_route, "------->>>>>> current route")
    this.loadUserData(null,current_route[2]);
    // this.loadPosts();
  }

  loadPosts(){
    // this.sendReq.
  }

  loadUserData(id:string=null, instaHandle:string=null){
    this.sendReq.userInfo(id,instaHandle).subscribe(res => {
      if(res.status == 200){
        console.log(res.body[0]);
        this.usersArray = res.body[0];
        this.setUserData();
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
      
    });
  }

  setUserData(){
    this.name = this.usersArray.name;
    this.username = this.usersArray.instaHandle;
    this.followers = this.usersArray.followers;
    this.following = this.usersArray.following;
    this.posts = this.usersArray.postsCount;
    this.bio = this.usersArray.about;

    let current_route = this._router.url.split("/");
    
    let loggedinUserHandle = this.sendReq.jsonDecoder(localStorage.getItem("token")).data.instaHandle
    if (current_route[2] == loggedinUserHandle){
      this.isVisible = true
    }
    else{
      this.isVisible = false
    }
  }

  getFollowers(){
    let current_route = this._router.url.split("/");
   
    this.sendReq.getFollowersList(current_route[2]).subscribe(res => {
      if(res.status == 200){
        console.log(res.body);
        this.followersArray = res.body;
        console.log(this.followersArray, "------->>>>>> followers")
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
      
    });

  }

  getFollowing(){
    let current_route = this._router.url.split("/");
   
    this.sendReq.getFollowingList(current_route[2]).subscribe(res => {
      if(res.status == 200){
        console.log(res.body);
        this.followingArray = res.body;
        console.log(this.followingArray, "------->>>>>> followers")
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
      
    });

  }

  



}
