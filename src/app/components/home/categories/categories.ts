
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CATEGORIES } from '../../../data/categories';
import type { Category } from '../../../models/category.model';
import { CategoryCard } from '../../category-card/category-card';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryCard],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {

  // Estado reactivo con las categorías existentes.
  readonly categories = signal<Category[]>(CATEGORIES);

  // Inyección del servicio de navegación.
  private readonly router = inject(Router);

  // Recibe la categoría emitida por CategoryCard.
  goToCategory(category: Category): void {
    void this.router.navigate(['/gallery'], {
      queryParams: {
        category: category.id
      }
    });
  }
}
