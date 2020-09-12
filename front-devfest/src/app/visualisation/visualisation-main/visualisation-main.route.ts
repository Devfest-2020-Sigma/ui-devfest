import { Route } from '@angular/router';
import { PrisePhotoComponent } from '../01_prise-photo/prise-photo.component';
import { SelectionPhotoMosaicComponent } from '../02_selection-photo-mosaic/selection-photo-mosaic.component';
import { SelectionPseudoComponent } from '../03_selection-pseudo/selection-pseudo.component';
import { ImpressionPhotoComponent } from '../05_impression-photo/impression-photo.component';
import { ChoixRenduComponent } from '../04_choix-rendu/choix-rendu.component';


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
    path: 'choix-rendu/:id/:numero',
    component: ChoixRenduComponent,
    canActivate: []
  },
  {
    path: 'impression',
    component: ImpressionPhotoComponent,
    canActivate: []
  }];
