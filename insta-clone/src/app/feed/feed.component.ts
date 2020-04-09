import { PostService } from "./../services/post.service";

import { SendHttpRequestService } from "./../send-http-request.service";
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Injectable,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  constructor(
    private sendReq: SendHttpRequestService,
    private PostService: PostService,
    private domSanitizer: DomSanitizer
  ) {}
  @ViewChild("modal", { static: false }) modal: ElementRef;
  @ViewChild("caption", { static: false }) caption: ElementRef;
  @ViewChild("commentarea", { static: false }) commentarea: ElementRef;
  show: Boolean = false;
  buttonName: String = "follow";
  follow() {
    this.show = !this.show;
    if (this.show) this.buttonName = "follow";
    else this.buttonName = "unfollow";
  }

  
  res: any;
  feed: any;

  addcomment(text: string) {
    let commentObj = {
      ownerID: this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id, //from token
      comment: this.commentarea.nativeElement.value,
    };

    console.log(commentObj);
    this.sendReq.commentPost(commentObj).subscribe((res) => (this.res = res));
    console.log(this.res);
  }

  ngOnInit() {
    this.loadPosts();
  }
  openModal() {
    this.modal.nativeElement.style.display = "flex";
  }

  closeModal() {
    this.modal.nativeElement.style.display = "none";
  }

  postImages: any = [];
  loadPosts() {
    this.PostService.getFeed().subscribe((res) => {
      this.feed = res.payload.data.feedFinal;
      console.log(res, this.feed, "response feed");
      console.log(this.feed, "my feed");
      this.fillPostImages();
    });
  }

  fillPostImages() {
    this.feed.map((post: any, index: number) => {
      if (post.image) {
        let TYPED_ARRAY = new Uint8Array(post.image.data);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');
        
        let base64String = btoa(STRING_CHAR);
        
        this.postImages[index] = this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
      }
      return null;
    });
  }
}
