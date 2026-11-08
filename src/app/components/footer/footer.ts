import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MAIN_LINKS, ACCOUNT_LINKS } from '../../data/nav-links';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  indexLinks = MAIN_LINKS;
  accountLinks = ACCOUNT_LINKS;
  currentYear = new Date().getFullYear();
}