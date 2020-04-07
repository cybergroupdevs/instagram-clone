import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const PATH = 'http://localhost:8080/api/file'; 

@Injectable({
    'providedIn': 'root'
})
export class FileUploadService{
    headers: HttpHeaders = new HttpHeaders({
        Authorization: localStorage.getItem('token')
    });

    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    fileUpload(formData: any, id: string): Observable<any>{
        console.log(formData, 'formData inside service');
        return this.http.patch<any>(`${PATH}`, formData, this.httpOptions);
    }
}