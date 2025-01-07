import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  
  {path :"customers",component:CustomersComponent,canActivate:[AuthGuard], data : { roles : ['USER' || 'ADMIN']}},
  {path :"accounts",component:AccountsComponent},
  {path :"dashboard",component:DashboardComponent,canActivate:[AuthGuard], data : { roles : ['ADMIN']}},
  { path :"new-customer", component : NewCustomerComponent,canActivate:[AuthGuard], data : { roles : ['ADMIN']}},
  { path :"customer-accounts/:id", component : CustomerAccountsComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
