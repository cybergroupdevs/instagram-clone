import { ProfileDashboardComponent } from './../profile-dashboard/profile-dashboard.component';
import { jsonDecoder } from '../utils/jsonDecoder';
import { SendHttpRequestService } from './../send-http-request.service';
import { LikeService } from './../services/like.service';
import { Component, OnInit, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';



@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss']   
})

export class ModalComponent implements OnInit{
    likesArray : any
    loggedInUserId : string

    constructor(private LikeService: LikeService, private ProfileDashboardComponent: ProfileDashboardComponent, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalComponent>) { 
        
    }

    ngOnInit() {
        
        console.log(this.data.postId)
        this.getLikes(this.data.postId);
        this.loggedInUserId = jsonDecoder().data._id
        console.log(this.loggedInUserId, "loggedin user")
    
    }

    getLikes(postId:string){
        this.LikeService.getLikes(postId).subscribe(res=>{
          this.likesArray = res.payload.data.allLikes
          console.log(this.likesArray, "yes here only")
        })

    }

    follow(instaHandle:string){
        this.ProfileDashboardComponent.follow(instaHandle)
    }

    unfollow(instaHandle: string){
    
        this.ProfileDashboardComponent.unfollow(instaHandle)
    }

    closeBtn(){
        console.log('Hitted');
    }
}