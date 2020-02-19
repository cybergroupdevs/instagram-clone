import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
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
