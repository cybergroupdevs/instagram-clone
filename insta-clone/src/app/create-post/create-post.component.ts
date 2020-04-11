import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';

import { Component, OnInit, NgModule, ViewEncapsulation ,Input} from '@angular/core';

import { ObjectUnsubscribedError } from 'rxjs';
import findHashtags from '../utils/findHashTags';
import findMentions from '../utils/findMentions';
import { PostService } from '../services/post.service';
import { IResponse } from '../models/IResponse';
import { jsonDecoder } from '../utils/jsonDecoder';
import { FileUploadService } from "../services/fileUpload.service";
import { SafeUrl } from '@angular/platform-browser';
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

  @Input()
  bufferedImage: SafeUrl;

  constructor(
    private postService: PostService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(){
    
  }

  selectImage(event: any): void{
    console.log(event, 'event');
    this.imageFile = event.target.files[0];
    console.log(this.imageFile, 'this.imageFile');
  }

  createPostHandler(content: IPostContent): void{
    console.log('post content', content);

    let hashtags: Array<string> = findHashtags(content.caption);
    let mentions: Array<string> = findMentions(content.caption);

    console.log('hashTags ', hashtags.toString(), 'mentions ', mentions);

    const formData = new FormData();
    formData.append('caption', content.caption);
    formData.append('hashtags', hashtags.toString());
    formData.append('mentions', mentions.toString());
    formData.append('imageFile', this.imageFile);

    this.postService.createPost(formData).subscribe((res: IResponse) => {
      console.log(res, 'response after subscribing');
    }); 
  }

  styleCaption(caption: string){
    console.log(caption);
    let substrings: Array<string> = caption.split(/([@,#][\w_-]+)/g);
    
    substrings.forEach((substring: string, index: number) => {
      if(substring[0] === '@'){
        substrings[index] = `<a class="highlight" href="/profile/${substring.slice(1)}">${substring}</a>`;
      }
      if(substring[0] === '#'){
        substrings[index] = `<a class="highlight">${substring}</a>`;
      }
    }); 

    console.log(substrings.join(""));
    
    this.caption = substrings.join('');
  }

  caption: string;

}
