import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IResponse } from '../models/IResponse';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LikeService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
    });

    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    getLikes(id:string): Observable<IResponse>{
        return this.http.get<IResponse>(`http://localhost:8080/likes/${id}`,  this.httpOptions);
    }

}