import { Component, OnInit } from '@angular/core';

import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  statusMessage: string;

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    console.log('Inside ngOnInit():::::');
    this.getBooks();
  }

  getBooks(): void {
    console.log('Inside getBooks():::::');
    this._bookService.getAllBooks().subscribe(
      (bookData) => this.books = bookData,
      (error) => {
        console.log(error);
        this.statusMessage = 'Problem with service. Please try again later!';
      }
    );
  }

}
