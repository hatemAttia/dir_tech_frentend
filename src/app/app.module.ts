import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { NavBarComponent } from './shared/component/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/component/side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RouterModule } from '@angular/router';
import { routes } from './shared/config';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent,
    SideBarComponent,
    HomeComponent,
    SignupComponent,
    HomeAdminComponent,
    LoginAdminComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes ) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
