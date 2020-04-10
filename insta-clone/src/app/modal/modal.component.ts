// import { SendHttpRequestService } from './../send-http-request.service';
// import { LikeService } from './../services/like.service';
// import { Component } from "@angular/core"

// @Component({
//     selector: 'app-modal',
//     templateUrl: 'modal.component.html',
//     styleUrls: ['modal.component.scss']   
// })

// export class ModalComponent{

//     likesArray : any = [];
//     loggedInUserId : string;

//     constructor(private LikeService: LikeService, private sendReq: SendHttpRequestService) { }

//     ngOnInit() {
//         this.loggedInUserId = this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id
//     }

//     getLikes(postId:string){
//         this.LikeService.getLikes(postId).subscribe(res=>{
//           this.likesArray = res.payload.data.likesArray
//         })
//     }
// }