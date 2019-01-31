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

const bookApiUrl = 'http://localhost:8080/bookapi/api/';
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
    const body = res;
    return body || {};
  }

  getAllBooks(): Observable<any> {
    return this._httpService.get(bookApiUrl + 'books').pipe(
      map(this.extractData),
      // catchError(this.handleError('getHeroes', []))
      catchError(this.handleError)
    );
  }

  addBook(book: Book) {
    const body = JSON.stringify(book);
    return this._httpService
      .post(bookApiUrl + 'save', body, httpOptions)
      // .pipe(catchError(this.handleError('addBook', book)));
      .pipe(catchError(this.handleError));
  }

  deleteBook(bookId: string) {
    return this._httpService.delete(bookApiUrl + 'delete/' + bookId, );
  }

  getBook(bookId: string): Observable<any> {
    return this._httpService.get(bookApiUrl + 'book/' + bookId)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }


  private handleError(error: Response) {
    return throwError(error);
  }
}
