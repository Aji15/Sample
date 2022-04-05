import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../Shared/book.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
 
  bookForm !: FormGroup;
  actionBtn: string ='Save';
 

  constructor(private formBuilder : FormBuilder,public service:BookService,
    @Inject(MAT_DIALOG_DATA) public editData : any = null,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.bookForm=this.formBuilder.group({
      id:[''],
      bookName:['',Validators.required],
      category:['',Validators.required],
      price:['',Validators.required],
      author:['',Validators.required],
   });
     
   if(this.editData){
    this.actionBtn="Update";
    this.bookForm.patchValue(this.editData)
    // this.bookForm.controls['bookName'] .setValue(this.editData.bookName);
    // this.bookForm.controls['category'] .setValue(this.editData.category);
    // this.bookForm.controls['price'] .setValue(this.editData.price);
    // this.bookForm.controls['author'] .setValue(this.editData.author);
   
  } 

 
  }
  addBook(){
    if(!this.editData){
      if(this.bookForm.valid){
       this.service.postBook(this.bookForm.value)
       .subscribe({
         next:(res)=>{
           alert("Details Added Successfully");
           this.bookForm.reset();
           this.dialogRef.close('Save');
         },
         error : ()=>{
           alert("Error while Adding Details");
         }
       })
      }
      }
      else{
      
        this.updateTeam();
     }

  }

  updateTeam(){
    console.log(this.bookForm.value)
    this.service.putBook(this.bookForm.value)
     .subscribe({
       next :(res)=>{
        alert("Details Updated Successfully");
        this.bookForm.reset();
        this.dialogRef.close('Update');
       },
       error :()=>{
        alert("Error while updation");
       }
     })
  }

  
 




}



