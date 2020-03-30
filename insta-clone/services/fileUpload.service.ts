import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const path = 'http://localhost:8080/api/user'; 

@Injectable({
    'providedIn': 'root'
})
export class FileUploadService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
    });

    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    fileUpload(formData: any): Observable<any>{
        console.log(formData, 'formData inside service');
        return this.http.patch<any>(path, { formData }, this.httpOptions);
    }
}