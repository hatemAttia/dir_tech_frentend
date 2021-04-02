import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { HomeAdminComponent } from "../admin/home-admin/home-admin.component";
import { LoginAdminComponent } from "../auth/login-admin/login-admin.component";

export const routes: Routes = [

    {
        path: 'admin/login',
        component: LoginAdminComponent
    }, {
        path: 'admin/home',
        component: HomeAdminComponent
    }, 
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }]