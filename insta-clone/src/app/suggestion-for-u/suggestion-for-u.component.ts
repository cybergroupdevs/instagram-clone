import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-for-u',
  templateUrl: './suggestion-for-u.component.html',
  styleUrls: ['./suggestion-for-u.component.css']
})
export class SuggestionForUComponent implements OnInit {

  constructor(private _service: SendHttpRequestService) { }
  usersArray: any;
  ngOnInit() {
  }

}
