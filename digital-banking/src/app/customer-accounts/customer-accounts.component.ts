
import { AfterViewInit, Component,  ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AccountOperation, CustomerAccount } from '../models/account.model';
import {Customer} from "../models/customer.model";
import { CustomerService } from '../services/customer.service';
import { AccountFormComponent } from '../account-form/account-form.component';



@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements AfterViewInit {
  customerId! : number ;
  customer! : Customer;
  displayedColumns: string[] = ['id', 'Type','Date de creation','Balance','Status','CustomerDetails','Customer Name','Customer Email'];
  dataSource= new MatTableDataSource<CustomerAccount>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route : ActivatedRoute, private router :Router,private CS:CustomerService, private dialog: MatDialog) {
    
  }
  

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.dataSource=new MatTableDataSource<CustomerAccount>();
    this.dataSource.paginator = this.paginator;
    this.get();
    

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  get():void{
    this.CS.getCustomerAccount(this.customerId).subscribe((r)=>{
      this.dataSource= new  MatTableDataSource<CustomerAccount>(r);
    })
  }
  open()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.width='auto';
    dialogConfig.height='auto';
    

    dialogConfig.data = {
        id: this.customerId,
        type: 'CurrentAccount'
    };
    let dialogRef = this.dialog.open(AccountFormComponent, dialogConfig);

  }
  ajouter()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: this.customerId,
        type: 'SavingAccount'
    };
    let dialogRef = this.dialog.open(AccountFormComponent, dialogConfig);

  }
  

	
		

}