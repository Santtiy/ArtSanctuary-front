import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTWORKS } from '../../../data/artworks';
import { Artwork } from '../../../models/artwork.model';
import { LikesService } from '../../../services/likes.service';
import { ArtworkCard } from '../../artwork-card/artwork-card';

@Component({
  imports: [CommonModule, RouterLink, ArtworkCard],
  selector: 'app-recent-works',
  styleUrl: './recent-works.scss',
  templateUrl: './recent-works.html',
})
export class RecentWorks {
  private likes = inject(LikesService);

  artworks = signal<Artwork[]>(ARTWORKS.slice(0, 6));

  isLiked(id: number): boolean {
    return this.likes.isLiked(id);
  }

  onLikeToggled(id: number): void {
    this.likes.toggle(id);
  }
}
