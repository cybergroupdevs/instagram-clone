import { Observable } from "rxjs";
import { OnInit } from "@angular/core";
import { SendHttpRequestService } from "../send-http-request.service";
import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { FileUploadService } from "services/fileUpload.service";
//3rd Party
import { FileUploader } from "ng2-file-upload";
import { jsonDecoder } from 'src/utils/jsonDecoder';

const URL = "http://localhost:8080/api/upload";

@Component({
  selector: "app-edit-profile-details",
  templateUrl: "./edit-profile-details.component.html",
  styleUrls: ["./edit-profile-details.component.css"]
})
export class EditProfileDetailsComponent implements OnInit {
  constructor(
    private sendReq: SendHttpRequestService,
    private _router: Router,
    private fileUploadService: FileUploadService,
    private el: ElementRef
  ) {}

  @ViewChild("uname", { static: false }) uname: ElementRef;
  @ViewChild("uinstaHandle", { static: false }) uinstaHandle: ElementRef;
  @ViewChild("uabout", { static: false }) uabout: ElementRef;
  @ViewChild("uphone", { static: false }) uphone: ElementRef;
  @ViewChild("uprofileImage", { static: false }) uprofileImage: ElementRef;
  @ViewChild("uwebsite", { static: false }) uwebsite: ElementRef;
  @ViewChild("ugender", { static: false }) ugender: ElementRef;
  @ViewChild("uemail", { static: false }) uemail: ElementRef;
  @ViewChild("updateButton", { static: false }) updateButton: ElementRef;

  res: any;
  usersData: any;
  name: string;
  username: string;
  bio: string;
  email: string;
  phone: Number;
  gender: string;
  profileImage: any;
  website: string;
  warningText: string;
  warning: boolean = false;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "photo"
  });

  ngOnInit() {
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token"))
      .data._id;
    this.loadUserData(loggedinUserId, null);

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
  update() {
    console.log("inside update");
    let loggedinUserId = this.sendReq.jsonDecoder(localStorage.getItem("token"))
      .data._id;
    let userObj = {
      name: this.uname.nativeElement.value,
      instaHandle: this.uinstaHandle.nativeElement.value,
      about: this.uabout.nativeElement.value,
      phone: this.uphone.nativeElement.value,
      email: this.uemail.nativeElement.value,
      // profileImage: this.uprofileImage.nativeElement.value,
      website: this.uwebsite.nativeElement.value,
      gender: this.ugender.nativeElement.value
    };

    this.sendReq.updateData(userObj, loggedinUserId).subscribe(res => {
      if (res.status == 200) {
        console.log("Successful update!!");
      } else if (res.status == 406) {
        this.warningText = res.error.message;
        this.warning = true;
      } else if (res.status == 401) {
        alert("Unauthorized");
        localStorage.removeItem("JwtHrms");
        this._router.navigate(["/login"]);
      }
    });
  }

  loadUserData(id: string = null, instaHandle: string = null) {
    console.log("loadingggggg");
    this.sendReq.userInfo(id, null).subscribe(res => {
      if (res.status == 200) {
        console.log(res.body[0]);
        this.usersData = res.body[0];
        this.setUserData();
      } else if (res.status == 401) {
        localStorage.removeItem("token");
        this._router.navigate(["/login"]);
      }
    });
  }

  setUserData() {
    this.name = this.usersData.name;
    this.username = this.usersData.instaHandle;
    console.log(this.usersData.email, "emaillll", this.usersData);
    this.email = this.usersData.email;
    this.phone = this.usersData.phone;
    this.bio = this.usersData.about;
    this.profileImage = this.usersData.profileImage;
    this.website = this.usersData.website;
    this.gender = this.usersData.gender;
  }
  readURL() {
    const preview = document.getElementById("profilePic") as HTMLImageElement;
    const file = (<HTMLInputElement>(
      document.getElementById("profileImageInput")
    )).files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function() {
        preview.src = String(reader.result);
        console.log(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  radioButtonValue(genderValue: string) {
    (<HTMLInputElement>(
      document.getElementById("genderInput")
    )).value = genderValue;
  }

  //   readURL3(input){
  //     const preview = document.getElementById('profilePic');
  //     const file = document.querySelector('input[type=file]').files[0];
  //     const reader = new FileReader();

  //     reader.addEventListener("load", function () {
  //       preview.src = reader.result;
  //     }, false);

  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  // }

  // upload() {
  //   //locate the file element meant for the file upload.
  //   let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
  //     "#photo"
  //   );
  //   //get the total amount of files attached to the file input.
  //   let fileCount: number = inputEl.files.length;
  //   console.log(fileCount, "fileCount");
  //   //create a new fromdata instance
  //   let formData = new FormData();
  //   //check if the filecount is greater than zero, to be sure a file was selected.
  //   if (fileCount > 0) {
  //     // a file was selected
  //     //append the key name 'photo' with the first file in the element
  //     formData.append("photo", inputEl.files[0]);
  //     console.log(formData, "formData", inputEl.files[0], "inputEl.files");
  //     this.fileUploadService.fileUpload(formData).subscribe(res => {
  //       console.log(res);
  //     });
  //   }
  // }

  // fileUpload(value: any) {
  //   console.log(value, "value of multipart");
  //   this.fileUploadService.fileUpload(value).subscribe((res: any) => {
  //     console.log(res, "response");
  //   });

  //   this.makeFileRequest("", [], value).then(result => {
  //     console.log(result);
  //   });
  // }

  // makeFileRequest(url: string, params: Array<string>, file: File) {
  //   return new Promise((resolve, reject) => {
  //     var formData: any = new FormData();

  //     console.log(formData, "formData");

  //     var xhr = new XMLHttpRequest();
  //     formData.append("upload", file, file.name);

  //     console.log(formData, "formData Appended");

  //     // for(var i = 0; i < files.length; i++) {
  //     //     formData.append("uploads[]", files[i], files[i].name);
  //     // }
  //     // xhr.onreadystatechange = function () {
  //     //     if (xhr.readyState == 4) {
  //     //         if (xhr.status == 200) {
  //     //             resolve(JSON.parse(xhr.response));
  //     //         } else {
  //     //             reject(xhr.response);
  //     //         }
  //     //     }
  //     // }
  //     // xhr.open("POST", url, true);
  //     // xhr.send(formData);
  //   });
  // }
  images: any;

  selectImage(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files);
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('image', this.images);

    console.log(formData);

    const _id = jsonDecoder().data.instaHandle;
    this.fileUploadService.fileUpload(formData, _id).subscribe((res: any) => {
      console.log(res);
    });
  }
}
