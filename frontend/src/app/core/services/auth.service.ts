import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtPayload } from '../models/auth.model';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    // currentUser es una señal reactiva. Cuando cambia, Angular actualiza la UI automáticamente.
    currentUser = signal<JwtPayload | null>(this.loadUserFromStorage());
    isAuthenticated = computed(() => !!this.currentUser());

    // Al arrancar el servicio, intenta cargar el usuario desde localStorage
    private loadUserFromStorage(): JwtPayload | null {
        const token = localStorage.getItem('token');
        if (!token) return null;
        return this.decodeToken(token);
    }

    login(id: string, password: string) {
        return this.http.post<string>(`${environment.apiUrl}/auth/login`, { id, password }, { responseType: 'text' as 'json' }).pipe(
            tap((token) => {
                localStorage.setItem('token', token);
                const payload = this.decodeToken(token);
                this.currentUser.set(payload);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    // Decodifica el JWT sin librería externa.
    // Un JWT tiene 3 partes separadas por puntos: header.payload.signature
    // El payload está en Base64, lo decodificamos y lo parseamos a JSON.
    private decodeToken(token: string): JwtPayload | null {
        try {
            const payload = token.split('.')[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded) as JwtPayload;
        } catch {
            return null;
        }
    }
}
