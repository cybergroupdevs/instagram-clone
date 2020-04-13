import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { HostListener } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { PostService } from "./../services/post.service";
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  
  constructor(
    private PostService: PostService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

  }

  // @ViewChild 

// allImages=[
//   "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop",
//   "https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop",
  

  
// ];
feed: any;
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
