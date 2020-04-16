import { ProfileDashboardComponent } from './../profile-dashboard/profile-dashboard.component';
import { jsonDecoder } from '../utils/jsonDecoder';
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
    result : boolean = false;

    constructor(private LikeService: LikeService, private ProfileDashboardComponent: ProfileDashboardComponent, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalComponent>) { 
        
    }

    ngOnInit() {
        this.getLikes(this.data.postId);
        this.loggedInUserId = jsonDecoder().data._id
    }

    getLikes(postId:string){
        this.LikeService.getLikes(postId).subscribe(res=>{
          this.likesArray = res.payload.data.allLikes
          
        })

    }

    follow(instaHandle:string){
        this.ProfileDashboardComponent.follow(instaHandle)
        this.getLikes(this.data.postId)
        
    }

    unfollow(instaHandle: string){
        this.ProfileDashboardComponent.unfollow(instaHandle)
        this.getLikes(this.data.postId)
    }

    
}