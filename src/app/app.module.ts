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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { TeaherListComponent } from './admin/teaher-list/teaher-list.component';
import { SerchTeacherPipe } from './shared/pipes/serch-teacher.pipe';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
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
    LoginAdminComponent,
    LoginUserComponent,
    TeaherListComponent,
    SerchTeacherPipe,
    ProfilAdminComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
