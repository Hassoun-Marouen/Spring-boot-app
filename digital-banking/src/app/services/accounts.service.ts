import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails, CustomerAccount} from "../models/account.model";
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }
  public getListAccounts():Observable<CustomerAccount[]>{
    return this.http.get<CustomerAccount[]>(environment.backendHost+"/accounts");
  }
  public saveCurrentAccount(idCustomer: number,initialbalance:number,overdraft:number):Observable<any>{
    const data={
      balance:initialbalance,
      overDraft:overdraft,
      customerDTO:{
        id:idCustomer
      }

    }
    console.log(data);
      
    return this.http.post(environment.backendHost+"/accounts/saveCurrentAccount",data);
  }
  public saveSavingAccount(idCustomer: number,initialbalance:number,interestrate:number):Observable<any>{
    const data={
      balance:initialbalance,
      interestRate:interestrate,
      customerDTO:{
        id:idCustomer
      }

    }
      
    return this.http.post(environment.backendHost+"/accounts/saveSavingAccount",data);
  }
  
}