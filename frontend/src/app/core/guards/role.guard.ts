import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard que protege rutas por rol.
// La ruta debe incluir  data: { role: 'NombreDelRol' }
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser();
    const requiredRole = route.data['role'] as string;

    if (user && user.roleName === requiredRole) {
        return true;
    }

    // Si el usuario está logueado pero tiene otro rol, lo redirigimos a su ruta correcta
    if (user) {
        return router.createUrlTree([getRoleDefaultRoute(user.roleName)]);
    }

    return router.createUrlTree(['/login']);
};

function getRoleDefaultRoute(roleName: string): string {
    if (roleName === 'Service_Overseer') return '/dashboard';
    if (roleName === 'Overseer_Aux') return '/territory-record-form';
    return '/login';
}
