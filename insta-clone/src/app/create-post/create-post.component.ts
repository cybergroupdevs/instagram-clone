import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';
import { Component, OnInit, NgModule } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import findHashtags from 'src/utils/findHashTags';
import findMentions from 'src/utils/findMentions';
import { PostService } from '../services/post.service';
import { IResponse } from '../models/IResponse';

const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {
  
  constructor(private postService: PostService) { }

  ngOnInit(){}

  createPostHandler(content: string): void{
    console.log('post content', content);

    let hashtags: Array<string> = findHashtags(content);
    let mentions: Array<string> = findMentions(content);

    console.log('hashTags ', hashtags, 'mentions ', mentions);

    this.postService.createPost({ caption: content, tags: hashtags, mentions }).subscribe((res: IResponse) => {
      console.log(res, 'response after subscribing');
    }); 
  }


}
