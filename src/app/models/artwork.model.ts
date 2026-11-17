export type ArtworkCategory =
  | 'painting'
  | 'sculpture'
  | 'illustration'
  | 'photography'
  | 'artist'
  | 'carroza';

export interface Artwork {
  id: number;
  title: string;
  author: string;
  category: ArtworkCategory;
  image: string;
  likes: number;
  description?: string;
}
