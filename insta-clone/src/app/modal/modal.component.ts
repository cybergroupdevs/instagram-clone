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

    likesArray : any = [];
    loggedInUserId : string;

    constructor(private LikeService: LikeService, private sendReq: SendHttpRequestService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalComponent>) { }

    ngOnInit() {
        this.loggedInUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
    }

    getLikes(postId:string){
        this.LikeService.getLikes(postId).subscribe(res=>{
          this.likesArray = res.payload.data.likesArray
        })
    }
}