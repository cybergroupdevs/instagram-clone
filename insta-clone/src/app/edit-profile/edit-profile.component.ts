import { OnInit } from '@angular/core';
import { SendHttpRequestService } from './../send-http-request.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService) { }
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('instaHandle', {static: false}) instaHandle: ElementRef;
  @ViewChild('about', {static: false}) about: ElementRef;
  @ViewChild('phone', {static: false}) phone: ElementRef;
  @ViewChild('profileImage', {static: false}) profileImage: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  res: any;

  ngOnInit(): void {
  }
  update(){
    let userObj = {
      name: this.name.nativeElement.value,
      instaHandle: this.instaHandle.nativeElement.value,
      about: this.about.nativeElement.value,
      phone: this.phone.nativeElement.value,
      profileImage: this.profileImage.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value
    }
    

  }
}
