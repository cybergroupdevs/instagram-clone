
import { SendHttpRequestService } from './../send-http-request.service';

import { ProfileDashboardComponent } from './../profile-dashboard/profile-dashboard.component';

import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';



import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';


@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.css']
})
export class HomenavComponent implements OnInit {
  users$: Observable<any[]>;
  private searchTerms = new Subject<string>();


  constructor(


    
  ) { }


  constructor(private sendHttpRequestService: SendHttpRequestService) { }
  // Push a search term into the observable stream. 
  search(term: string): void {
    this.searchTerms.next(term);
   }
  res:any;


  

  ngOnInit(){
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.sendHttpRequestService.searchUsers(term)
    ));
    
  }

  ngOnInit() {
  }
  

  
