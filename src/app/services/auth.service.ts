import { Injectable, signal } from '@angular/core';

// Solo con fines educativos: en una app real las contraseñas NUNCA se guardan en el navegador.
export interface User {
  artistName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'as_users';
  private readonly SESSION_KEY = 'as_session';
  currentUser = signal<User | null>(this.loadSession());

  login(email: string, password: string): boolean {
    const user = this.getUsers().find(u => u.email === email && u.password === password);
    if (!user) return false;
    this.currentUser.set(user);
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem(this.SESSION_KEY);
  }

  protected getUsers(): User[] {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private loadSession(): User | null {
    const raw = localStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
