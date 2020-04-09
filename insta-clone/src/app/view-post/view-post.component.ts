import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  public show:boolean = false;
  public paragraphName:any = 'View replies';
  constructor() { }

  ngOnInit() {
  }
  toggle() {
    this.show = !this.show;

    
    if(this.show)  
      this.paragraphName = "Hide replies";
    else
      this.paragraphName = "View replies";
  }

}
