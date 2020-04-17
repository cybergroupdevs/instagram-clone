import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { IResponse } from '../models/IResponse';
import { Observable } from 'rxjs';

const POST_API = `http://localhost:8080/api/post`;
const POST_OPERATION_API = `http://localhost:8080/api/operation`;
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

    createComment(postId: string, content: string, operation: string): Observable<IResponse>{
        console.log(postId, 'postId', content, 'content');
        const params: HttpParams = new HttpParams()
        .set('type', 'comment')
        .set('operation', operation);

        return this.http.patch<IResponse>(`${POST_OPERATION_API}/${postId}`, { content }, { ...this.httpOptions, params });
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