import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Book } from './book';

const getBooksUrl = 'http://localhost:8080/bookapi/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'responseType': 'text'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private _httpService: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAllBooks(): Observable<any> {
    return this._httpService.get(getBooksUrl + 'books')
              .pipe(
                map(this.extractData),
                catchError(this.handleError('getHeroes', []))
              );
  }

  addBook(book: Book): Observable<Book> {
    return this._httpService.post<Book>(getBooksUrl + 'save', book, httpOptions)
      .pipe(
        catchError(this.handleError('addBook', book))
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
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
