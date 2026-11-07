import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  export interface ArtWork {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    artist: string;
    year: number;
  }

  export interface Tool {
    id: number;
    name: string;
    description: string;
    ícon: string;
    free: boolean;
  }
