import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'territory-record-form',
                canActivate: [roleGuard],
                data: { role: 'Overseer_Aux' },
                loadComponent: () => import('./features/trecord-form/trecord-form.component').then(m => m.TerritoryRecordFormComponent)
            },
            {
                path: 'dashboard',
                canActivate: [roleGuard],
                data: { role: 'Service_Overseer' },
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    {
        path: "**",
        redirectTo: 'login'
    }
];
