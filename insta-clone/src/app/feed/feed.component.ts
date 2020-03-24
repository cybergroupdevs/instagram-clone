
import { SendHttpRequestService } from './../send-http-request.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
declare function addcomment(): any;

const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
 

export class FeedComponent implements OnInit {
    
  constructor(private sendReq: SendHttpRequestService) { }
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('caption', {static: false}) caption: ElementRef;
  @ViewChild('commentarea', {static: false}) commentarea: ElementRef;
    show:Boolean=false;
    buttonName:String="follow";
    follow(){
      this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "follow";
    else
      this.buttonName = "unfollow";
    }

  fileOptions: FileUploaderOptions = {};

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    authTokenHeader: "token",
    authToken: localStorage.getItem("token")
  });

  uploadPost(){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("ownerId", this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id);
      form.append("caption", this.caption.nativeElement.value);
    }
    this.uploader.uploadAll();
  }

  loadPosts(){
    console.log("posts()");
    this.sendReq.posts().subscribe(res => {
      console.log(res);
    });
    // console.log(this.sendReq.posts());
  }
  res: any;
  addcomment(text:string){
      let commentObj = {
      //hande of user who liked,photoID and comment
      ownerID: this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id,  //from token
      // upload_ID: this.photoID.nativeElement.value,
      comment:this.commentarea.nativeElement.value
    }

      console.log(commentObj);
      this.sendReq.commentPost(commentObj).subscribe(res => this.res = res);
      console.log(this.res);
  }


  ngOnInit() {
    this.loadPosts();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log("Uploaded File details", item, status);
    };
  }
  openModal(){
    this.modal.nativeElement.style.display = "flex";
  }

  closeModal(){
    this.modal.nativeElement.style.display = "none";
  }
   //    let instahandle= {
   //    //    //hande of owner of post
   //    //    ownerID: this.ownerID.nativeElement.value,
   //    //  }

   //    //  console.log(ownerID);
   //    //  this.sendReq.loadUserDetail(ownerID).subscribe(res => this.res = res);
   //    //  console.log(this.res);
   //    //  this.sendReq.loadUploads(ownerID).subscribe(res => this.res = res);
   //     console.log(this.res);
   //  }

   // liked_func() { 
   //       let likedObj = {
   //         //hande of user who liked and photoID
   //       //   ownerID: this.ownerID.nativeElement.value,  //from token
   //       //   photoID: this.photoID.nativeElement.value
   //       }
   //       console.log(likedObj);
   //       this.sendReq.likePost(likedObj).subscribe(res => this.res = res);
   //       console.log(this.res);

   // }
   allImages=[
    "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop",
      
    
  ];
}

