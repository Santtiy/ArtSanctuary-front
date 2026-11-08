import { ArtworkCategory } from './artwork.model';

export interface Category {
  id: ArtworkCategory;
  label: string;
  image?: string;
  icon?: string;
}
