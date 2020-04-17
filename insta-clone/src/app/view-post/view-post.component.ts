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
    private _router : Router) { }

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

  getpost(postId : string){
    this.PostService.getPost(postId).subscribe(res=> {
      this.postObj = res.payload.data.returnObj
      console.log(this.postObj)
    })


    this.PostService.getComments(postId).subscribe(res=>{
      this.commentsArray = res.payload.data.commentsArray
      console.log(this.commentsArray)
    })
  }

  createComment(commentSection : any, postId:string){
    console.log("hello", commentSection.value.commentArea, "here")
    let current_route = this._router.url.split("/");
    this.PostService.createComment(postId, commentSection.value.commentArea, 'inc').subscribe((res: IResponse) => {
      console.log(res);
      this.getpost(current_route[2])
      commentSection.value.reset()
    });
  }

}
