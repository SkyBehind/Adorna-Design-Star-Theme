export interface Artwork {
  filename: string;
  title: string;
  medium: string;
  materials: string;
  dimensions: string;
  artistStatement: string;
  image: string;
  collection: string;
  year: string;
}

export function loadEarrings(): Promise<Artwork[]>;