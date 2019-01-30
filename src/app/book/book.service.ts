import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



import { Book } from './book';

const getBooksUrl = 'http://localhost:8080/bookapi/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _httpService: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAllBooks(): Observable<any> {
    return this._httpService.get(getBooksUrl + 'books').pipe(
      map(this.extractData),
      // catchError(this.handleError('getHeroes', []))
      catchError(this.handleError)
    );
  }

  addBook(book: Book) {
    let body = JSON.stringify(book);
    return this._httpService
      .post(getBooksUrl + 'save', body, httpOptions)
      //.pipe(catchError(this.handleError('addBook', book)));
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  private handleError(error: Response) {
    return throwError(error);
  }
}
