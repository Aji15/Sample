import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './list';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  
  
  postBook(book: object){
     return this.http.post<List>("http://localhost:42431/Book/AddBook", book);
  }
  getBook(): Observable<any> {

    return this.http.get<any>("http://localhost:42431/Book/GetBook");
  }
  putBook(book : any):Observable<any>{
    return this.http.put<any>("http://localhost:42431/Book/UpdateBook",book);
  }
  deleteBook(id:any): Observable<any> {
    return this.http.delete(`http://localhost:42431/Book/DeleteBook?id=${id}`);
  }

  // postBook(data : any){
  //   return this.http.post<any>("http://localhost:3000/posts",data);
  // }
  // getBook(){
  //   return this.http.get<any>("http://localhost:3000/posts");
  // }
  // putBook(data : any,id : number){
  //   return this.http.put<any>("http://localhost:3000/posts/"+id,data);
  // }
  // deleteBook(id : number){
  //   return this.http.delete<any>("http://localhost:3000/posts/"+id);
  // }
   
 
  
}
