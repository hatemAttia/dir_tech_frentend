import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from "src/app/home/home.component";
import { HomeAdminComponent } from "../admin/home-admin/home-admin.component";
import { OffreControllerComponent } from '../admin/offre-controller/offre-controller.component';
import { ProfilAdminComponent } from "../admin/profil-admin/profil-admin.component";
import { SkillControllerComponent } from '../admin/skill-controller/skill-controller.component';
import { StuffControllerComponent } from '../admin/stuff-controller/stuff-controller.component';
import { TeaherListComponent } from "../admin/teaher-list/teaher-list.component";
import { LoginAdminComponent } from "../auth/login-admin/login-admin.component";
import { LoginUserComponent } from "../auth/login-user/login-user.component";
import { SignupComponent } from "../auth/signup/signup.component";
import { AddOfferComponent } from '../home/add-offer/add-offer.component';
import { HomeStuffComponent } from '../home/home-stuff/home-stuff.component';
import { HomeTeacherComponent } from '../home/home-teacher/home-teacher.component';
import { ListFavoriteComponent } from '../home/list-favorite/list-favorite.component';
import { OffreListComponent } from '../home/offre-list/offre-list.component';
import { ProfilComponent } from '../home/profil/profil.component';
import { SingleOffreComponent } from '../home/single-offre/single-offre.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginUserComponent },
    { path: 'admin/login', component: LoginAdminComponent },
    {
        path: 'admin', component: HomeAdminComponent, canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            {
                path: 'teacher',
                component: TeaherListComponent
                , canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' },
            },
            {
                path: 'offre',
                component: OffreControllerComponent
                , canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' },
            },
            {
                path: 'profil',
                component: ProfilAdminComponent
                , canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' },
            },
            {
                path: 'stuff',
                component: StuffControllerComponent
                , canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' },
            }, {
                path: 'skill',
                component: SkillControllerComponent
                , canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' },
            }]
    },
    { path: '', redirectTo: '/home/offers', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'stuff',
                component: HomeStuffComponent
            },
            { path: '', redirectTo: 'offers/', pathMatch: 'full' },
            {

                path: 'teacher',
                component: HomeTeacherComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_STUFF' },
            },
            {
                path: 'profil',
                component: ProfilComponent
            },
            {
                path: 'favorite',
                component: ListFavoriteComponent,
                canActivate: [AuthGuard]
                , data: { role: 'ROLE_STUFF' },
            },
            {
                path: 'add-offer',
                component: AddOfferComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_STUFF' },
            },
            {
                path: 'single-offre',
                component: SingleOffreComponent
            },
            {
                path: 'offers',
                component: OffreListComponent, canActivate: [AuthGuard]
            }]
    },
    { path: '**', redirectTo: 'login' }
]