import { Routes } from "@angular/router";
import { CategoryControllerComponent } from "src/app/admin/category-controller/category-controller.component";
import { HomeAdminComponent } from "src/app/admin/home-admin/home-admin.component";
import { OffreControllerComponent } from "src/app/admin/offre-controller/offre-controller.component";
import { ProfilAdminComponent } from "src/app/admin/profil-admin/profil-admin.component";
import { SkillControllerComponent } from "src/app/admin/skill-controller/skill-controller.component";
import { StuffControllerComponent } from "src/app/admin/stuff-controller/stuff-controller.component";
import { TeaherListComponent } from "src/app/admin/teaher-list/teaher-list.component";
import { LoginAdminComponent } from "src/app/auth/login-admin/login-admin.component";
import { LoginUserComponent } from "src/app/auth/login-user/login-user.component";
import { SignupComponent } from "src/app/auth/signup/signup.component";
import { AddOfferComponent } from "src/app/home/add-offer/add-offer.component";
import { HomeStuffComponent } from "src/app/home/home-stuff/home-stuff.component";
import { HomeTeacherComponent } from "src/app/home/home-teacher/home-teacher.component";
import { HomeComponent } from "src/app/home/home.component";
import { ListFavoriteComponent } from "src/app/home/list-favorite/list-favorite.component";
import { OffreListComponent } from "src/app/home/offre-list/offre-list.component";
import { ProfilComponent } from "src/app/home/profil/profil.component";
import { SingleOffreComponent } from "src/app/home/single-offre/single-offre.component";
import { AuthGuard } from "../services/auth.guard";

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
            }, {
                path: 'category',
                component: CategoryControllerComponent
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