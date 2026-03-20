import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule]
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup = this.fb.group({
        id: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    isLoading = signal(false);
    errorMessage = signal('');

    onLogin() {
        if (this.loginForm.invalid) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        const { id, password } = this.loginForm.value;

        this.authService.login(id, password).subscribe({
            next: () => {
                const user = this.authService.currentUser();
                if (user?.roleName === 'Service_Overseer') {
                    this.router.navigate(['/dashboard']);
                } else if (user?.roleName === 'Overseer_Aux') {
                    this.router.navigate(['/territory-record-form']);
                } else {
                    this.router.navigate(['/login']);
                }
            },
            error: () => {
                this.errorMessage.set('Usuario o contraseña incorrectos.');
                this.isLoading.set(false);
            },
            complete: () => this.isLoading.set(false)
        });
    }
}