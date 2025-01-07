import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { CustomerAccount } from '../models/account.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from "@angular/router";
import { CustomerService } from '../services/customer.service';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'Type','Date de creation','Balance','Status','CustomerDetails','Customer Name','Customer Email'];
  dataSource= new MatTableDataSource<CustomerAccount>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private AS:AccountsService) {
    
    
  }
  ngOnInit(): void {
    
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
    this.AS.getListAccounts().subscribe((r)=>{
      this.dataSource= new  MatTableDataSource<CustomerAccount>(r);
    })
  }

}
