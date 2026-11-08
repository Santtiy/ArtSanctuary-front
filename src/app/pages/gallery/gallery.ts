import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtworkCard } from '../../components/artwork-card/artwork-card';
import { ARTWORKS } from '../../data/artworks';
import { Artwork, ArtworkCategory } from '../../models/artwork.model';
import { LikesService } from '../../services/likes.service';

type FilterId = 'all' | ArtworkCategory;

@Component({
  imports: [CommonModule, ArtworkCard],
  selector: 'app-gallery',
  styleUrl: './gallery.scss',
  templateUrl: './gallery.html',
})
export class Gallery implements OnInit {
  private likes = inject(LikesService);
  private route = inject(ActivatedRoute);

  filters: { id: FilterId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'painting', label: 'Painting' },
    { id: 'sculpture', label: 'Sculpture' },
    { id: 'illustration', label: 'Illustration' },
    { id: 'photography', label: 'Photography' },
  ];

  selected = signal<FilterId>('all');
  artworks = signal<Artwork[]>(ARTWORKS);

  filteredArtworks = computed(() =>
    this.selected() === 'all'
      ? this.artworks()
      : this.artworks().filter((artwork) => artwork.category === this.selected()),
  );

  ngOnInit(): void {
    const category = this.route.snapshot.queryParamMap.get('category');
    const filter = this.filters.find((item) => item.id === category);

    if (filter) {
      this.selected.set(filter.id);
    }
  }

  selectFilter(id: FilterId): void {
    this.selected.set(id);
  }

  isLiked(id: number): boolean {
    return this.likes.isLiked(id);
  }

  onLikeToggled(id: number): void {
    this.likes.toggle(id);
  }
}
