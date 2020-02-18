import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SendHttpRequestService {

  constructor( private http: HttpClient) { }

  private log(message: string) {
    console.log(message);
  }

  signMeUp(obj): Observable<any>{
    return this.http.post("http://localhost:8080/signup", obj).pipe(
      tap(_ => this.log("Signed Up")),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  logMeIn(obj): Observable<any>{
    return this.http.post("url to come here", obj);
  }

  posts(): Observable<any>{
    return this.http.get("url to come here");
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
