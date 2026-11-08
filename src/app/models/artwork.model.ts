export type ArtworkCategory = 'painting' | 'sculpture' | 'illustration' | 'photography';

export interface Artwork {
  id: number;
  title: string;
  author: string;
  category: ArtworkCategory;
  image: string;
  likes: number;
}
