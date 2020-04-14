import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { IResponse } from '../models/IResponse';
import { Observable } from 'rxjs';

const POST_API = `http://localhost:8080/api/post`;
const GET_FEED = `http://localhost:8080/feed`;

@Injectable({
    providedIn: 'root'
})
export class PostService{
    headers: HttpHeaders = new HttpHeaders({
        Authorization: localStorage.getItem('token')
    });

    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    createPost(formData: FormData): Observable<IResponse>{
        return this.http.post<IResponse>(POST_API, formData, this.httpOptions);
    }

    getFeed(): Observable<any>{
        return this.http.get<any>(GET_FEED,  this.httpOptions);
        
    }
    getUsersPosts(instaHandle:string): Observable<any>{
        console.log(instaHandle, 'instaHandle inside getUserPosts()');
        
        const params: HttpParams = new HttpParams()
        .set('instaHandle', instaHandle);

        return this.http.get<IResponse>(POST_API, { ...this.httpOptions, params }); 
    }
    
    

}