import { Route } from '@angular/router';
import { VisualisationMainComponent } from './visualisation-main.component';
import { SelectionPhotoMosaicComponent } from '../02_selection-photo-mosaic/selection-photo-mosaic.component';
import { SelectionPseudoComponent } from '../03_selection-pseudo/selection-pseudo.component';
import { ImpressionPhotoComponent } from '../04_impression-photo/impression-photo.component';
import { PrisePhotoComponent } from '../01_prise-photo/prise-photo.component';


export const visualisationMainRoute: Route[] = [
  {
    path: 'prise-photo',
    component: PrisePhotoComponent,
    canActivate: []
  },
  {
    path: 'selection-photo/:id',
    component: SelectionPhotoMosaicComponent,
    canActivate: []
  },
  {
    path: 'selection-pseudo/:id/:numero',
    component: SelectionPseudoComponent,
    canActivate: []
  },
  {
    path: 'impression',
    component: ImpressionPhotoComponent,
    canActivate: []
  }];
