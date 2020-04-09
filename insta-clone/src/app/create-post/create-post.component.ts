import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';
import { Component, OnInit, NgModule } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import findHashtags from 'src/app/utils/findHashTags';
import findMentions from 'src/app/utils/findMentions';
import { PostService } from '../services/post.service';
import { IResponse } from '../models/IResponse';


interface IPostContent{
  caption: string;
  imageFile: File;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {
  imageFile: File;

  constructor(private postService: PostService) { }

  ngOnInit(){}

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
    let substrings: Array<string> = caption.split(/\s([@,#][\w_-]+)/g);
    
    substrings.forEach((substring: string, index: number) => {
      if(substring[0] === '@' || substring[0] === '#'){
        substrings[index] = `<p class="highlight">${substring}</p>`;
      }
    }); 

    console.log(substrings.join(""));
    
    this.caption = substrings.join('');
  }

  caption: string;
}
