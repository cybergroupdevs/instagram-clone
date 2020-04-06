import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IResponse } from '../models/IResponse';
import { Observable } from 'rxjs';

const POST_API = `http://localhost:8080/api/post`;

@Injectable({
    providedIn: 'root'
})
export class PostService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
    });

    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    createPost(postBody: any): Observable<IResponse>{
        return this.http.post<IResponse>(POST_API, postBody, this.httpOptions);
    }

}