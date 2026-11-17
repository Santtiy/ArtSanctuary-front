import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTISTS } from '../../../data/artisan-profiles';
import { Artwork } from '../../../models/artwork.model';
import { LikesService } from '../../../services/likes.service';
import { ArtworkCard } from '../../artwork-card/artwork-card';

@Component({
  imports: [CommonModule, RouterLink, ArtworkCard],
  selector: 'app-artists-section',
  styleUrl: './artists-section.scss',
  templateUrl: './artists-section.html',
})
export class ArtistsSection {
  private likes = inject(LikesService);

  artists = signal<Artwork[]>(ARTISTS.slice(0, 6));

  isLiked(id: number): boolean {
    return this.likes.isLiked(id);
  }

  onLikeToggled(id: number): void {
    this.likes.toggle(id);
  }
}
