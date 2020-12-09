import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //{ path: "", redirectTo: "Home", pathMatch: "full" },
  { path: "Home", component: HomeComponent },
  { path: "Login", component: LoginComponent },
  { path: "Product", component: ProductComponent },
  { path: "Register", component: RegisterComponent },
  { path: "Dashboard", component: DashboardComponent },
  { path: "Admin", component: AdminComponent },
  { path: "ForgotPassword", component: OtpComponent },
  { path: "otp", component: OtpComponent },
  { path: "ChangePassword", component: ChangepasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
