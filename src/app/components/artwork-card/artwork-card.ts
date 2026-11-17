import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Artwork } from '../../models/artwork.model';

@Component({
  imports: [CommonModule],
  selector: 'app-artwork-card',
  styleUrl: './artwork-card.scss',
  templateUrl: './artwork-card.html',
})
export class ArtworkCard {
  private router = inject(Router);

  @Input({ required: true }) artwork!: Artwork;
  @Input() liked = false;

  @Output() likeToggled = new EventEmitter<number>();

  get hasProfile(): boolean {
    return this.artwork.category === 'artist' || this.artwork.category === 'carroza';
  }

  get totalLikes(): number {
    return this.artwork.likes + (this.liked ? 1 : 0);
  }

  onLike(event: MouseEvent): void {
    event.stopPropagation();
    this.likeToggled.emit(this.artwork.id);
  }

  openProfile(): void {
    if (this.artwork.category === 'carroza') {
      void this.router.navigate(['/carrozas', this.artwork.id]);
    } else if (this.artwork.category === 'artist') {
      void this.router.navigate(['/artisans', this.artwork.id]);
    }
  }
}
