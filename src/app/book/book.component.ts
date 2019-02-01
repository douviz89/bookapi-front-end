import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any = [];
  book = new Book();
  statusMessage: string;

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this._bookService.getAllBooks().subscribe(
      (data: Book[]) => {
        console.log(data);
        this.books = data;
      },
      (error) => {
        console.log(error);
        this.statusMessage = 'Problem with service. Please try again later!';
      }
    );
  }

  addBook(): void {
    this._bookService.addBook(this.book)
      .subscribe(
        (response) => {
          console.log(response);
          this.reset();
          this.getBooks();
        },
        (error) => {
          console.log(error);
          this.statusMessage = 'Problem with service. Please try again later!';
        }
      );
  }

  deleteBook(bookId: string): void {
    console.log('Inside the deleteBook():::::Book Id:::::' + bookId);
    this._bookService.deleteBook(bookId)
      .subscribe(
        (response) => {
          console.log(response);
          this.getBooks();
        },
        (error) => {
          console.log(error);
          this.statusMessage = 'Problem with service. Please try again later!';
        }
      );
    this.reset();
    console.log('End of deleteBook():::::');
  }

  getBookById(bookId: string): void {
    this._bookService.getBook(bookId)
      .subscribe(
        (response) => {
          console.log(response);
          this.book = response;
        },
        (error) => {
          console.log(error);
          this.statusMessage = 'Problem with service. Please try again later!';
        }
      );
    this.reset();
  }

  private reset() {
    this.book.id = null;
    this.book.title = null;
    this.book.author = null;
  }
}
