import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artwork } from '../../models/artwork.model';

@Component({
  imports: [CommonModule],
  selector: 'app-artwork-card',
  styleUrl: './artwork-card.scss',
  templateUrl: './artwork-card.html',
})
export class ArtworkCard {
  @Input({ required: true }) artwork!: Artwork;
  @Input() liked = false;

  @Output() likeToggled = new EventEmitter<number>();

  get totalLikes(): number {
    return this.artwork.likes + (this.liked ? 1 : 0);
  }

  onLike(event: MouseEvent): void {
    event.stopPropagation();
    this.likeToggled.emit(this.artwork.id);
  }
}
