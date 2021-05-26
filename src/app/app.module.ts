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
import { routes } from './shared/config/config';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { TeaherListComponent } from './admin/teaher-list/teaher-list.component';
import { SerchTeacherPipe } from './shared/pipes/serch-teacher.pipe';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
import { HomeStuffComponent } from './home/home-stuff/home-stuff.component';
import { HomeTeacherComponent } from './home/home-teacher/home-teacher.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HomeHeaderComponent } from './shared/component/home-header/home-header.component';
import { HomeFooterComponent } from './shared/component/home-footer/home-footer.component';
import { OffreListComponent } from './home/offre-list/offre-list.component';
import { ProfilComponent } from './home/profil/profil.component';
import { AddOfferComponent } from './home/add-offer/add-offer.component';
import { ModalAddOffreComponent } from './shared/modal-add-offre/modal-add-offre.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { OffreControllerComponent } from './admin/offre-controller/offre-controller.component';
import { StuffControllerComponent } from './admin/stuff-controller/stuff-controller.component';
import { SkillControllerComponent } from './admin/skill-controller/skill-controller.component';
import { SearchSkillPipe } from './shared/pipes/search-skill.pipe';
import { SingleOffreComponent } from './home/single-offre/single-offre.component';
import { ListFavoriteComponent } from './home/list-favorite/list-favorite.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryControllerComponent } from './admin/category-controller/category-controller.component';

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
    ProfilAdminComponent,
    HomeStuffComponent,
    HomeTeacherComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    OffreListComponent,
    ProfilComponent,
    AddOfferComponent,
    ModalAddOffreComponent,
    OffreControllerComponent,
    StuffControllerComponent,
    SkillControllerComponent,
    SearchSkillPipe,
    SingleOffreComponent,
    ListFavoriteComponent,
    CategoryControllerComponent,
  ],
  imports: [
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule ],
  providers: [  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
