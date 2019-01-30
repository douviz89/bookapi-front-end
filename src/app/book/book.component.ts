import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any = [];

  book = new Book();

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this._bookService.getAllBooks().subscribe(
      (data: Book[]) => {
       console.log(data);
       this.books = data;
      });
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
          }
        );
  }

  private reset() {
    this.book.id = null;
    this.book.title = null;
    this.book.author = null;
  }
}
