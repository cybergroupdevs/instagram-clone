import { SafeUrl } from '@angular/platform-browser';
import { BufferToImage } from './../utils/bufferToImage';
import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';
import { Component, OnInit, NgModule, ViewEncapsulation, EventEmitter, Output , Input, ElementRef, ViewChild} from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import findHashtags from '../utils/findHashTags';
import findMentions from '../utils/findMentions';
import { PostService } from '../services/post.service';
import { IResponse } from '../models/IResponse';


interface IPostContent{
  caption: string;
  imageFile: File;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreatePostComponent implements OnInit {
  imageFile: File;
  caption: string;

  @Output()
  reloadPost: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  bufferedImage : SafeUrl;
    
  constructor(private postService: PostService) { }

  ngOnInit(){}

  preview: SafeUrl;

  selectImage(event: any): void{
    this.imageFile = event.target.files[0];

    if(event.target.files && event.target.files[0]){
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.preview = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  createPostHandler(content: IPostContent): void{

    let hashtags: Array<string> = findHashtags(content.caption);
    let mentions: Array<string> = findMentions(content.caption);


    const formData = new FormData();
    formData.append('caption', content.caption);
    formData.append('hashtags', hashtags.toString());
    formData.append('mentions', mentions.toString());
    formData.append('imageFile', this.imageFile);

    this.postService.createPost(formData).subscribe((res: IResponse) => {
      this.reloadPost.emit();
      this.caption = null;
      this.imageFile = null;
      this.preview = null;
    }); 
  }

  styleCaption(caption: string){
    let substrings: Array<string> = caption.split(/([@,#][\w_-]+)/g);
    
    substrings.forEach((substring: string, index: number) => {
      if(substring[0] === '@'){
        substrings[index] = `<a class="highlight" href="/profile/${substring.slice(1)}">${substring}</a>`;
      }
      if(substring[0] === '#'){
        substrings[index] = `<a class="highlight">${substring}</a>`;
      }
    }); 

    
    this.caption = substrings.join('');
  }
}