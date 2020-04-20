import { LikeService } from './../services/like.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from "./../services/post.service";
import { Router, ActivatedRoute } from '@angular/router';
import { IResponse } from '../models/IResponse';
import { BufferToImage } from '../utils/bufferToImage';
import { DomSanitizer,SafeUrl } from "@angular/platform-browser";



@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  public show:boolean = false;
  public paragraphName:any = 'View replies';

  postObj : any
  commentsArray : any

  constructor(private PostService: PostService,
    private _router : Router, private domSanitizer: DomSanitizer, private LikeService: LikeService) { }

  ngOnInit() {
    let current_route = this._router.url.split("/");
    this.getpost(current_route[2])

  }
  toggle() {
    this.show = !this.show;

    
    if(this.show)  
      this.paragraphName = "Hide replies";
    else
      this.paragraphName = "View replies";
  }

  postImage: SafeUrl;
  userImage: SafeUrl;

  getpost(postId : string){
    this.PostService.getPost(postId).subscribe(res=> {
      console.log(res, 'postObject')
      this.postObj = res.payload.data.returnObj;

      this.postImage = BufferToImage.bufferToImage(this.postObj.image, this.domSanitizer);
      this.userImage = BufferToImage.bufferToImage(this.postObj.userImage, this.domSanitizer);

    })


    this.PostService.getComments(postId).subscribe(res=>{
      this.commentsArray = res.payload.data.commentsArray
      console.log(this.commentsArray, 'response after subscribing to post api', Date.now());

      this.commentsArray = this.commentsArray.map((comment: any, index: number) => {
        comment.image = BufferToImage.bufferToImage(comment.bufferedImage, this.domSanitizer);
        console.log(Date.now(), comment, index);
        return comment;
      });

      console.log(this.commentsArray, 'after adding SafeUrls', Date.now());
    })
  }

  toggleLike(postId, operation){
    let current_route = this._router.url.split("/");
    console.log("here")
    
    this.LikeService.like(postId, operation).subscribe(res=>{
      this.getpost(current_route[2])
      console.log(res.success, res.payload.message, "response")
    })
  }

  createComment(content : any, postId:string){
    
    let current_route = this._router.url.split("/");
    this.PostService.createComment(postId, content, 'inc').subscribe((res: IResponse) => {
      console.log(res);
      this.getpost(current_route[2])
      //commentSection.value.reset()
    });
  }

}
