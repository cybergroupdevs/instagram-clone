import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})

export class SendHttpRequestService {

  constructor( private http: HttpClient) { }

  private log(message: string) {
    console.log(message);
  }
  // //Decode JWT and return the Payload in JSON Format
  jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  
  header_token: HttpHeaders = new HttpHeaders().set("token", localStorage.getItem("token"));

  signMeUp(obj): Observable<any>{
    return this.http.post("http://localhost:8080/signup", obj).pipe(
      tap(_ => this.log("Signed Up")),
      catchError(this.handleError<any>('Some Error Occurred'))
    );
  }

  logMeIn(obj): Observable<any>{
    return this.http.post("http://localhost:8080/login", obj, {responseType: 'text'}).pipe(
      tap(_ => this.log("Log In")),
      catchError(this.handleError<any>('Some Error Occurred'))
    );
  }


  updateUser(obj): Observable<any>{
    return this.http.put("http://localhost:8080/user:"+this.jsonDecoder(localStorage.getItem("token")).data._id,
    {headers: this.header_token});
  }

  posts(): Observable<any>{
    return this.http.get("http://localhost:8080/posts", {headers: this.header_token}).pipe(
      tap(_ => this.log("Got Posts")),
      catchError(this.handleError<any>('Some Error Occurred'))
    );
  }

  userData(): Observable<any>{
    return this.http.get("http://localhost:8080/user:"+this.jsonDecoder(localStorage.getItem("token")).data._id,
       {headers: this.header_token});
    return this.http.get("http://localhost:8080/upload").pipe(
      tap(_ => this.log("showing feed")),
      catchError(this.handleError<any>('error in feed'))
    );
  }

  likePost(obj):Observable<any>{
    return this.http.put("http://localhost:8080/like", obj).pipe(
      tap(_ => this.log("Liked Picture")),
      catchError(this.handleError<any>('error in liking post'))
    );
  }

  commentPost(obj):Observable<any>{
    return this.http.post("http://localhost:8080/comment", obj).pipe(
      tap(_ => this.log("Commented")),
      catchError(this.handleError<any>('error in commenting on post'))
    );
  }
  
  followUser(obj):Observable<any>{
    return this.http.post("http://localhost:8080/follow", obj).pipe(
      tap(_ => this.log("Followed")),
      catchError(this.handleError<any>('error in following'))
    );
  }

  unfollowUser(obj):Observable<any>{
    return this.http.post("http://localhost:8080/unfollow", obj).pipe(
      tap(_ => this.log("Unfollowed")),
      catchError(this.handleError<any>('error in unfollowing'))
    );
  }
  searchUsers(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty users array.
      return of([]);
    }//(`${this.heroesUrl}/?name=${term}`)
    return this.http.get(`http://localhost:8080/user?instaHandle=${term}`, {headers: this.header_token}).pipe(
      tap(_ => this.log("display users")),
      catchError(this.handleError<any>('error in loading'))
    );
  }

  loadUserDetail(obj):Observable<any>{
    return this.http.get("http://localhost:8080/user", obj).pipe(
      tap(_ => this.log("Unfollowed")),
      catchError(this.handleError<any>('error in unfollowing'))
    );
  }

  loadUploads(obj):Observable<any>{
    return this.http.get("http://localhost:8080/upload", obj).pipe(
      tap(_ => this.log("Unfollowed")),
      catchError(this.handleError<any>('error in unfollowing'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}
