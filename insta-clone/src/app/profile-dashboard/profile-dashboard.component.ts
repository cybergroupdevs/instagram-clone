import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService) { }

  username: String = "_shubham_1999";
  posts: Number = 22;
  following: Number = 133;
  followers: Number = 199;
  name: String = "Shubham Sharma";
  bio: String = "I am a Software Developer. Currently I am an Intern at Cyber Group. I am pursuing B.Tech from Sharda University.";
  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(){
    // this.sendReq.
  }

}
