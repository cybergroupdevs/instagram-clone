import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';
import { Component, OnInit, NgModule } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';

const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {
  
  constructor() { }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log("Uploaded File details", item, status);
    };
  }
}
