import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthPanel } from '../../components/auth-panel/auth-panel';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthPanel],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  showPassword = signal(false);
  loginError = signal('');
  infoMessage = signal('');

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('registered') === 'true') {
      this.infoMessage.set('Account created. Sign in to continue.');
    }
  }

  togglePassword(): void { this.showPassword.update(value => !value); }
  forgotPassword(): void { this.infoMessage.set('Password recovery coming soon.'); }

  onSubmit(): void {
    this.loginError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    if (!this.auth.login(email!, password!)) {
      this.loginError.set('Incorrect email or password.');
      return;
    }
    void this.router.navigate(['/']);
  }
}
