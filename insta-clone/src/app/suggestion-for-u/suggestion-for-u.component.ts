import { ProfileDashboardComponent } from './../profile-dashboard/profile-dashboard.component';
import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-suggestion-for-u',
  templateUrl: './suggestion-for-u.component.html',
  styleUrls: ['./suggestion-for-u.component.css']
})
export class SuggestionForUComponent implements OnInit {

  constructor(private _service: SendHttpRequestService,private _router:Router) { }
  usersArray: any;
  // name:string;
  // username:string;
  // followers:number;
  // following:number;
  // posts: number;
  // bio:string;
  // loggedinUserId: string;
  // followersArray=[]
  // followingArray=[]
  // editButton : Boolean=false;
  // followButton:Boolean=false;
  // unfollowButton : Boolean=false;
 
  ngOnInit() {
    let obj=this._service.showSuggestion().subscribe(res => {
      this.usersArray=res;
    });
  }
profile(id,instaHandle){
  let obj=this._service.userInfo(id,instaHandle).subscribe(res => {
    this.usersArray=res;
  });
}

}
