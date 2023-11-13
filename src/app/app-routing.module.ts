import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { AdministratorComponent } from './dashboard/administrator/administrator.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { SupervisorComponent } from './dashboard/supervisor/supervisor.component';
import { DriverComponent } from './dashboard/driver/driver.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: SignUpComponent },
  {path: 'administrator', component: AdministratorComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'supervisor', component: SupervisorComponent},
  {path: 'driver', component: DriverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
