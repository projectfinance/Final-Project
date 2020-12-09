import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardService } from './services/dashboardservice';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OtpService } from './services/otpService';
import { ProductService } from './services/productService';
import { UserService } from './services/user.service';
import { AccountLoginService } from './services/account-login.service';
import { ChangePasswordService } from './services/changePasswordService';
import { ProductComponent } from './product/product.component';
import { PayemiComponent } from './payemi/payemi.component';
import { PayEmiService } from './services/payemiService';
import { ProductFilterPipe } from './product/product-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    OtpComponent,
    ChangepasswordComponent,
    ProductComponent,
    PayemiComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DashboardService,OtpService,ProductService,UserService,AccountLoginService,ChangePasswordService,PayEmiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
