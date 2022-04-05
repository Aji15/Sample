import { Component, OnInit } from '@angular/core';
import { BookService } from '../Shared/book.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookData: any;

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    // this.bookService.getBook().subscribe((res)=>{
    //   this.bookData=res;
    //})
  }

}
