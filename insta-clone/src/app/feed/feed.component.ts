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

   liked_func() { 
         let likedObj = {
           //hande of user who liked and photoID
          //  instaHandle: this.instaHandle.nativeElement.value,
          //  photoID: this.photoID.nativeElement.value

         }
         console.log(likedObj);
         this.sendReq.likePost(likedObj).subscribe(res => this.res = res);
         console.log(this.res);


   //    let instahandle= {
   //    //    //hande of owner of post
   //    //    ownerID: this.ownerID.nativeElement.value,
   //    //  }

   //    //  console.log(ownerID);
   //    //  this.sendReq.loadUserDetail(ownerID).subscribe(res => this.res = res);
   //    //  console.log(this.res);
   //    //  this.sendReq.loadUploads(ownerID).subscribe(res => this.res = res);
   //     console.log(this.res);

   addcomment(){
      let commentObj = {
      //hande of user who liked and photoID
      // instaHandle: this.instaHandle.nativeElement.value,
      // upload_ID: this.photoID.nativeElement.value,
      // comment:this.comment.nativeElement.value

      comment:this.comment.nativeElement.value

    }


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

   // addcomment(){
   //    let commentObj = {
   //    //hande of user who liked and photoID
   //    // ownerID: this.ownerID.nativeElement.value,  //from token
   //    // upload_ID: this.photoID.nativeElement.value,
   //    comment:this.comment.nativeElement.value
   //  }

   //  console.log(commentObj);
   //  this.sendReq.commentPost(commentObj).subscribe(res => this.res = res);
   //  console.log(this.res);
   // }

  
//   allImages.forEach(element => {
     
//    username=;
//    location="cybergroup";
//    username1="shyam123";
//    username2="reena43";
//    comment1="awesome";
//    comment2="beauty queen";
//   suggestions=[      
//     {username:"deepsy123",name:"deepanshu",url:"https://picsum.photos/200/200?random"},
//     {username:"dees234",name:"deepak",url:"https://picsum.photos/200/200?random"},
//     {username:"saerty234",name:"sahil",url:"https://picsum.photos/200/200?random"}
//   ];
     
//   });

