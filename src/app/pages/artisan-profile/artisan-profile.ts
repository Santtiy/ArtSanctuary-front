import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ARTISAN_PROFILES } from '../../data/artisan-profiles';
import { ArtisanProfile as ArtisanProfileModel } from '../../models/artisan-profile.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-artisan-profile',
  styleUrl: './artisan-profile.scss',
  templateUrl: './artisan-profile.html',
})
export class ArtisanProfile {
  private route = inject(ActivatedRoute);

  profile = signal<ArtisanProfileModel | undefined>(this.findProfile());

  private findProfile(): ArtisanProfileModel | undefined {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id)) {
      return undefined;
    }

    return ARTISAN_PROFILES.find((profile) => profile.id === id);
  }
}
