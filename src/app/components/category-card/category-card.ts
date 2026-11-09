
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss'
})
export class CategoryCard {

  // Recibe una categoría desde el componente padre.
  @Input({ required: true })
  category!: Category;

  // Notifica al padre cuando se selecciona la categoría.
  @Output()
  open = new EventEmitter<Category>();

  // Emite la categoría seleccionada.
  onOpen(): void {
    this.open.emit(this.category);
  }

  // Permite seleccionar la tarjeta con la barra espaciadora.
  onSpace(event: Event): void {
    event.preventDefault();
    this.onOpen();
  }
}
