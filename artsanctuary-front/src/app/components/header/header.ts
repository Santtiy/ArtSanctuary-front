import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  links: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Explore', path: '/explore' },
    { label: 'Tools', path: '/dashboard/tools' },
    { label: 'Workspace', path: '/dashboard/workspaces' },
  ];

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}