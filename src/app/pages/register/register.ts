import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthPanel } from '../../components/auth-panel/auth-panel';
import { AuthService } from '../../services/auth.service';
import { passwordsMatch } from '../../validators/passwords-match.validator';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthPanel],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  form = this.fb.group(
    {
      artistName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );
  showPassword = signal(false);
  showConfirm = signal(false);
  registerError = signal('');

  togglePassword(): void { this.showPassword.update(value => !value); }
  toggleConfirm(): void { this.showConfirm.update(value => !value); }

  onSubmit(): void {
    this.registerError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { artistName, email, password } = this.form.getRawValue();
    if (this.auth.emailExists(email!)) {
      this.registerError.set('This email is already registered.');
      return;
    }
    this.auth.register({ artistName: artistName!, email: email!, password: password! });
    void this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
  }
}
