import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  imports: [CommonModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro {
  private router = inject(Router);

  description =
    'A curated visual reference library, a team portfolio, and collaborative tools for the artistic community at Pasto, Nariño.';

  microTools: string[] = [
    'Boards',
    'Crop',
    'Remove background',
    'Reference Grid',
    'Notan',
    'Color Mixing',
    'Gesture Drawing',
    'Proportion Canon',
  ];

  goTo(path: string) {
    this.router.navigate([path]);
  }

  openTool(toolName: string) {
    console.log('Herramienta seleccionada:', toolName);
    this.goTo('/dashboard/tools');
  }
}