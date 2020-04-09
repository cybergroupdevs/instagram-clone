import { LoginComponent } from "./../login/login.component";
import { SendHttpRequestService } from "./../send-http-request.service";
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements AfterViewInit {
  constructor(
    private sendReq: SendHttpRequestService,
    private _router: Router,
    private LoginComponent: LoginComponent
  ) {}

  // @ViewChild('email', {static: false}) email: ElementRef;
  // @ViewChild('name', {static: false}) name: ElementRef;
  // @ViewChild('instaHandle', {static: false}) instaHandle: ElementRef;
  // @ViewChild('password', {static: false}) password: ElementRef;

  res: any;
  isEmail: boolean = false;
  isinstaHandle: boolean = false;
  warning: boolean = false;
  warningText: string;

  ngAfterViewInit() {}
  ngOnInit() {
    let token = localStorage.getItem("token");
    if (!token) {
      this._router.navigate(["/signup"]);
    } else {
      this._router.navigate(["/feed"]);
    }
  }
  checkUniqueness(reference) {
    let searchObj = {};
    let key = reference.name;
    let value = reference.value;
    searchObj[key] = value;

    this.sendReq.checkIfDuplicate(searchObj).subscribe(res => {
      if (res.status == 200) {
        if (key == "instaHandle") {
          this.isinstaHandle = false;
        } else {
          this.isEmail = false;
        }
      } else {
        if (key == "instaHandle") {
          this.isinstaHandle = true;
        } else {
          this.isEmail = true;
        }
      }
    });
  }

  signup(userObj) {
    this.sendReq.signMeUp(userObj).subscribe(res => {
      if (res.status == 200) {
        this.LoginComponent.loginFunction({
          instaHandle: userObj.instaHandle,
          password: userObj.password
        });
      } else {
        console.log("not signed up");
        this.warningText = res.error.message;
        this.warning = true;
      }
    });
  }
}
