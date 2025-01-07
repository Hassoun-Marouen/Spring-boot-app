import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {


  id:string;
  titre:string;
  
  constructor(private AS:AccountsService,private dialogRef:MatDialogRef<AccountFormComponent>,private dialogRef2:MatDialogRef<AccountFormComponent>,@Inject(MAT_DIALOG_DATA) data:any,private router:Router) {
    this.id=data.id;
    this.titre=data.type;
    console.log(this.id);
    
  }
  form !:FormGroup;
  form2 !:FormGroup;
  ngOnInit(): void {
    if(this.titre=='CurrentAccount'){

    this.initForm();
    }else 
    this.initForm2();
  }
  initForm():void{
    this.form=new FormGroup({
      id: new FormControl(this.id,[Validators.required]),
      initialbalance:new FormControl(null,[Validators.required]),
      overdraft:new FormControl(null,[Validators.required])
      
    })
  }
  initForm2():void{
    this.form2=new FormGroup({
      id: new FormControl(this.id,[Validators.required]),
      initialbalance:new FormControl(null,[Validators.required]),
      interestrate:new FormControl(null,[Validators.required])
      
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value.initialbalance);
    let id = this.form.value.id;
    let initialbalance = this.form.value.initialbalance;
    let overdraft = this.form.value.overdraft;
    this.AS.saveCurrentAccount(id,initialbalance,overdraft).subscribe(()=>{
      this.router.navigate(['/customers']);

    });
  


}
ajouter() {
  this.dialogRef.close(this.form2.value);
  console.log(this.form2.value.interestrate);
  let id = this.form2.value.id;
  let initialbalance = this.form2.value.initialbalance;
  let interestrate = this.form2.value.interestrate;
  this.AS.saveSavingAccount(id,initialbalance,interestrate).subscribe(()=>{
    this.router.navigate(['/customers']);

  });



}

close() {
    this.dialogRef.close();
}

}
