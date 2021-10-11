import {Route} from '@angular/router';
import {AccueilComponent} from '../01_accueil/accueil.component';
import {RgpdComponent} from '../02_rgpd/rgpd.component';
import {InstructionsComponent} from '../03_instructions/instructions.component';
import {PrisePhotoComponent} from '../04_prise-photo/prise-photo.component';
import {ChoixRenduComponent} from '../05_choix-rendu/choix-rendu.component';
import {ImpressionPhotoComponent} from '../07_impression-photo/impression-photo.component';
import {SelectionPseudoComponent} from '../06_selection-pseudo/selection-pseudo.component';
import {PrisePhotoRetryComponent} from '../04_prise-photo-retry/prise-photo-retry.component';
import {PrisePhotoValidationComponent} from '../04_prise-photo-validation/prise-photo-validation.component';


export const visualisationMainRoute: Route[] = [
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'rgpd',
    component: RgpdComponent
  },
  {
    path : 'instructions',
    component : InstructionsComponent
  },
  {
    path: 'prise-photo/:id/:essai',
    component: PrisePhotoComponent,
    data: {animation: 'PrisePhotoPage'}
  },
  {
    path: 'prise-photo-retry/:id',
    component: PrisePhotoRetryComponent
  },
  {
    path: 'prise-photo-validation/:id',
    component: PrisePhotoValidationComponent
  },
  {
    path: 'selection-pseudo/:id',
    component: SelectionPseudoComponent
  },
  {
    path: 'choix-rendu/:id',
    component: ChoixRenduComponent
  },
  {
    path: 'impression-photo',
    component: ImpressionPhotoComponent
  }];
