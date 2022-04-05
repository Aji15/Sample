import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from './dialog/dialog.component';
import { FormGroup } from '@angular/forms';
import { BookService } from './Shared/book.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'CRUD';
  
  
  displayedColumns: string[] = ['position', 'bookName', 'category', 'price','author','action'];
  dataSource : MatTableDataSource<any>;
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  
  constructor(private service: BookService,private dialog:MatDialog){}

  ngOnInit(): void {
   this.getAllBook();
   }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width : "30%"
   }).afterClosed().subscribe(val=>{
    if(val === 'save'){
      this.getAllBook();
    }
  })
  }
 

//  getAllBook(){
//    this.service.getBook().subscribe(res=>{
//     this.dataSource=new MatTableDataSource(res);
//     this.dataSource.paginator=this.paginator; 
//     this.dataSource.sort=this.sort;
//    })
//  }
getAllBook(){
this.service.getBook()
.subscribe({
next:(res)=>{
  console.log(res);
  this.dataSource=new MatTableDataSource(res);
  this.dataSource.paginator=this.paginator; 
  this.dataSource.sort=this.sort;
},
error:(err)=>{
  alert("Error while fetching the details")
 
}
})
}
  
  edit(row :any){
    console.log(row)
    this.dialog.open(DialogComponent ,{
       width: '30%',
       data : row
    }).afterClosed().subscribe(val =>{
       if(val === 'update'){
         this.getAllBook();
       }
    })
  }
  delete(id : any){
    this.service.deleteBook(id)
    .subscribe({ 
      next : (res)=>{
        alert("Details Deleted Successfully..!");
        this.getAllBook();
      },
      error:()=>{
        alert("Error While Deletion..!");
      }
    })
  }

  
 
 
}

