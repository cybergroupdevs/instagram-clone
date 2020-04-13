import { jsonDecoder } from "src/app/utils/jsonDecoder";
import { ProfileDashboardComponent } from "./../profile-dashboard/profile-dashboard.component";
import { SendHttpRequestService } from "./../send-http-request.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-suggestion-for-u",
  templateUrl: "./suggestion-for-u.component.html",
  styleUrls: ["./suggestion-for-u.component.css"]
})
export class SuggestionForUComponent implements OnInit {
  constructor(
    private _service: SendHttpRequestService,
    private _router: Router
  ) {}
  usersArray: any;
  // name:string;
  // username:string;
  // followers:number;
  // following:number;
  // posts: number;
  // bio:string;
  loggedInUser: any;
  // followersArray=[]
  // followingArray=[]
  // editButton : Boolean=false;
  // followButton:Boolean=false;
  // unfollowButton : Boolean=false;

  ngOnInit() {
    this.loggedInUser = jsonDecoder();
    let obj = this._service.showSuggestion().subscribe(res => {
      this.usersArray = res;
    });
  }
  profile(id, instaHandle) {
    let obj = this._service.userInfo(id, instaHandle).subscribe(res => {
      this.usersArray = res;
      // this._router.navigate(["/profile"])
      // if(res.status == 200){
      //   console.log(res.body[0]);
      //   this.usersArray = res.body[0];
      //   this.setUserData();
      // }
      // else if(res.status == 401){
      //   localStorage.removeItem("token");
      //   this._router.navigate(['/login']);
      // }
    });
  }

  // setUserData(){
  //   this.name = this.usersArray.name;
  //   this.username = this.usersArray.instaHandle;
  //   this.followers = this.usersArray.followers;
  //   this.following = this.usersArray.following;
  //   this.posts = this.usersArray.postsCount;
  //   this.bio = this.usersArray.about;
  //   let current_route = this._router.url.split("/");
  //   let loggedinUserId = this._service.jsonDecoder(localStorage.getItem("token")).data._id
  //   if (current_route[2] == loggedinUserId){
  //     this.editButton = true
  //     this.followButton = false
  //     this.unfollowButton = false
  //   }
  //   else{
  //     this._service.checkFollow(current_route[2],loggedinUserId).subscribe(res => {
  //       console.log(res, "success")
  //       if(res.body.success == true){
  //         console.log(res.body);
  //         this.followButton = false
  //         this.unfollowButton = true
  //         this.editButton = false
  //       }
  //       else if(res.body.success == false){
  //         this.followButton = true
  //         this.unfollowButton = false
  //         this.editButton = false
  //       }
  //       else if (res.status==401){
  //         localStorage.removeItem("token");
  //         this._router.navigate(['/login']);
  //       }
  //     });
  //   }
  // }
}
