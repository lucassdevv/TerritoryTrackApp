import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'territory-record-form',
        loadComponent: () => import('./features/trecord-form/trecord-form.component').then(m => m.TerritoryRecordFormComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },


    {
        path:"**",
        redirectTo: 'login'
    }
];
