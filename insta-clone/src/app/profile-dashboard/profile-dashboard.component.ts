import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { BufferToImage } from '../utils/bufferToImage';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService, private _router:Router, private domSanitizer: DomSanitizer) { }

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
  editButton : Boolean=false;
  followButton:Boolean=false;
  unfollowButton : Boolean=false;
 
  
  ngOnInit() {
    this.loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
    let current_route = this._router.url.split("/");
    console.log(current_route, "------->>>>>> current route")
    this.loadUserData(current_route[2],null);
    // this.loadPosts();
  }

  loadPosts(){
    // this.sendReq.
  }

  loadUserData(id:string=null, instaHandle:string=null){
    this.sendReq.userInfo(id,instaHandle).subscribe(res => {
      if(res.status == 200){
        console.log(res.body, 'this.usersArray');
        this.usersArray = res.body.user;
        this.image = res.body.bufferedImage ? BufferToImage.bufferToImage(res.body.bufferedImage, this.domSanitizer): null;
        this.setUserData();
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
    });
  }

  image: any;
  setUserData(){
    this.name = this.usersArray.name;
    this.username = this.usersArray.instaHandle;
    this.followers = this.usersArray.followers;
    this.following = this.usersArray.following;
    this.posts = this.usersArray.postsCount;
    this.bio = this.usersArray.about;
    console.log(this.image);

    let current_route = this._router.url.split("/");
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
    if (current_route[2] == loggedinUserId){
      this.editButton = true
      this.followButton = false
      this.unfollowButton = false
    }
    else{
      this.sendReq.checkFollow(current_route[2],loggedinUserId).subscribe(res => {
        console.log(res, "success")
        if(res.body.success == true){
          console.log(res.body);
          this.followButton = false
          this.unfollowButton = true
          this.editButton = false
        }
        else if(res.body.success == false){
          this.followButton = true
          this.unfollowButton = false
          this.editButton = false
        }
        else if (res.status==401){
          localStorage.removeItem("token");
          this._router.navigate(['/login']);
        }
      });
    }
  }

  getFollowers(){
    let current_route = this._router.url.split("/");
    this.sendReq.getFollowersList(current_route[2]).subscribe(res => {
        console.log(res);
        this.followersArray = res.payload.data.allFollowers;
        console.log(this.followersArray, "------->>>>>> followers")
      if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
    });
  }

  getFollowing(){
    let current_route = this._router.url.split("/");
    this.sendReq.getFollowingList(current_route[2]).subscribe(res => {
      
        console.log(res.body);
        this.followingArray = res.payload.data.allFollowing;
        console.log(this.followingArray, "------->>>>>> followers")
      
      if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
    });
  }

  followObj(){
    let current_route = this._router.url.split("/");
    this.follow(current_route[2])
  }

  follow(ownerId){   
    let current_route = this._router.url.split("/");
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
    this.sendReq.followUser(ownerId, loggedinUserId).subscribe(res => {
      console.log(res.status, res, "status ????")
      if(res.status == 200 ){
        if (current_route[2] == ownerId){
          this.loadUserData(ownerId, null)
        }
        else{
          this.getFollowers();
          this.getFollowing()
        }
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }
    });
  }

  unfollowObj(){
    let current_route = this._router.url.split("/");
    this.unfollow(current_route[2])
  }

  unfollow(ownerId){
    let current_route = this._router.url.split("/");
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
    this.sendReq.unfollowUser(ownerId, loggedinUserId).subscribe(res => {
      if(res.status == 200){

        if (current_route[2] == ownerId){
          this.loadUserData(ownerId, null)
        }
        else{
          this.getFollowers();
          this.getFollowing()
        }

      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this._router.navigate(['/login']);
      }   
    });
  }

  logout(){
    localStorage.removeItem("token");
    this._router.navigate(['/login']);
  }
}