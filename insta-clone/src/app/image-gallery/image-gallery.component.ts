import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { HostListener } from "@angular/core";
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
<<<<<<< HEAD
  }
=======

  }

  // @ViewChild 

>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
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
  "https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop",
  

  
];
}
