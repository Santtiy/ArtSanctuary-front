import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LikesService {
  private readonly STORAGE_KEY = 'as_liked_artworks';

  likedIds = signal<number[]>(this.load());

  isLiked(id: number): boolean {
    return this.likedIds().includes(id);
  }

  toggle(id: number): void {
    this.likedIds.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.likedIds()));
  }

  private load(): number[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
