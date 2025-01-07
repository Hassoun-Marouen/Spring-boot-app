import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ChartDataset, ChartOptions, Legend } from 'chart.js';
import { AccountsService } from '../services/accounts.service';
import { CustomerService } from '../services/customer.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  
  nb_comptes!:number;
  nb_customers!:number;
  tab_comptes:number[]=[];
  ACTIVATED!:number;
  SUSPENDED!:number;
  CREATED!:number;
  chartData: ChartDataset[] = [
    {
    // ⤵ Add these
    label: '',
    data: this.tab_comptes
    }
    ];
   chartLabels: string[] = [];
    //Courbe2
    chartData1: ChartDataset[] = [
    {
    // ⤵ Add these
    label: '',
    data: [
      this.ACTIVATED,
      this.CREATED,
      this.SUSPENDED
    ]
    }
    ];
    chartLabels1: string[] = ['CREATED','SUSPENDED','ACTIVATED'];
    pieChartOptions = {
      responsive: true
    };
    chartOptions: ChartOptions = {
      
    };
    
  constructor(private AS : AccountsService,private CS : CustomerService) {
   
  
   
  }


  ngOnInit(): void {
    this.AS.getListAccounts().subscribe(res=>{
      this.nb_comptes=res.length;
      for(let i=0;i<this.nb_comptes;i++){
        this.chartLabels[i]=res[i].customerDTO.name;
        this.tab_comptes[i]=res[i].balance;
        console.log(this.tab_comptes[i]=res[i].balance);
        console.log( this.chartLabels[i]=res[i].customerDTO.name);
        
      }
      for(let i=0;i<this.nb_comptes;i++){
        if (res[i].status=="CREATED") {
          this.CREATED++
        } else {
          this.ACTIVATED++;
          this.SUSPENDED++;
          
        }

      }
      
    });
    this.CS.getCustomers().subscribe(res=>{
      this.nb_customers=res.length;
      
      
    });
    
  }
  
  
  
  
    //chartLabels1: string[] = [‘teacher’,’student’];

}
