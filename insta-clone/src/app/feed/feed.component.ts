import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
declare function addcomment(): any;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService,
   private _router: Router) {}

   goToProfile() {
      this._router.navigate(['/profile']);
    }

   @ViewChild('liked', {static: false}) liked: ElementRef;
   @ViewChild('comment', {static: false}) comment: ElementRef;
   res: any;
 
   liked_func() { 
         let likedObj = {
           //hande of user who liked and photoID
           //instaHandle: this.instaHandle.nativeElement.value,
          // photoID: this.photoID.nativeElement.value
         }
         console.log(likedObj);
         this.sendReq.likePost(likedObj).subscribe(res => this.res = res);
         console.log(this.res);

   }

   addcomment(){
      let commentObj = {
      //hande of user who liked and photoID
      //instaHandle: this.instaHandle.nativeElement.value,
      //upload_ID: this.photoID.nativeElement.value,
      comment:this.comment.nativeElement.value
    }

    console.log(commentObj);
    this.sendReq.commentPost(commentObj).subscribe(res => this.res = res);
    console.log(this.res);
      
   }



  ngOnInit() {
  }
  
  allImages=[
      "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
  ];
   username="deeps_rocks12";
   location="cybergroup";
   username1="shyam123";
   username2="reena43";
   comment1="awesome";
   comment2="beauty queen";
  suggestions=[      
    {username:"deepsy123",name:"deepanshu",url:"https://picsum.photos/200/200?random"},
    {username:"dees234",name:"deepak",url:"https://picsum.photos/200/200?random"},
    {username:"saerty234",name:"sahil",url:"https://picsum.photos/200/200?random"}
  ];
}
