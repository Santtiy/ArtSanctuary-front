import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ARTWORKS } from '../../data/artworks';
import { ArtworkCategory } from '../../models/artwork.model';

type FilterId = 'all' | ArtworkCategory;

@Component({
  imports: [CommonModule],
  selector: 'app-explore',
  styleUrl: './explore.scss',
  templateUrl: './explore.html',
})
export class Explore {
  private router = inject(Router);

  searchTerm = signal('');
  showFilters = signal(false);
  selectedCategory = signal<FilterId>('all');
  selectedTag = signal<string | null>(null);

  categoryFilters: FilterId[] = ['all', 'painting', 'sculpture', 'illustration', 'photography'];
  tags = [
    'abstract',
    'portrait',
    'landscape',
    'surrealism',
    'oil',
    'monochromatic',
    'architecture',
    'nature',
  ];
  newRecords = ARTWORKS.slice(0, 6);

  disciplines = computed(() =>
    (['painting', 'illustration', 'sculpture'] as ArtworkCategory[]).map((id) => ({
      id,
      count: ARTWORKS.filter((artwork) => artwork.category === id).length,
    })),
  );

  results = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return ARTWORKS.filter(
      (artwork) =>
        (category === 'all' || artwork.category === category) &&
        (!term ||
          artwork.title.toLowerCase().includes(term) ||
          artwork.author.toLowerCase().includes(term) ||
          artwork.category.includes(term)),
    );
  });

  isSearching = computed(
    () => this.searchTerm().trim() !== '' || this.selectedCategory() !== 'all',
  );

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.selectedTag.set(null);
    this.selectedCategory.set('all');
  }

  toggleFilters(): void {
    this.showFilters.update((visible) => !visible);
  }

  selectCategory(id: FilterId): void {
    this.selectedCategory.set(id);
  }

  selectTag(tag: string): void {
    if (this.selectedTag() === tag) {
      this.clearSearch();
      return;
    }

    this.selectedTag.set(tag);
    this.searchTerm.set(tag);
  }

  goToDiscipline(id: ArtworkCategory): void {
    this.router.navigate(['/gallery'], { queryParams: { category: id } });
  }
}
