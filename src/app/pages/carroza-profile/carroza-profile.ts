import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ARTISAN_PROFILES } from '../../data/artisan-profiles';
import { ArtisanProfile } from '../../models/artisan-profile.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-carroza-profile',
  styleUrl: './carroza-profile.scss',
  templateUrl: './carroza-profile.html',
})
export class CarrozaProfile {
  private route = inject(ActivatedRoute);

  profile = signal<ArtisanProfile | undefined>(this.findProfile());
  selectedPhoto = signal<string | undefined>(undefined);

  private findProfile(): ArtisanProfile | undefined {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id)) {
      return undefined;
    }

    return ARTISAN_PROFILES.find((profile) => profile.id === id);
  }

  openPhoto(photo: string): void {
    this.selectedPhoto.set(photo);
  }

  closePhoto(): void {
    this.selectedPhoto.set(undefined);
  }
}
