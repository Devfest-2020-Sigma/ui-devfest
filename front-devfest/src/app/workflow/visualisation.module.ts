import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SWIPER_CONFIG, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ImagesService} from '@service/images.service';
import {SharedLibModule} from '../shared/shared-lib.module';
import {AccueilComponent} from './01_accueil/accueil.component';
import {RgpdComponent} from './02_rgpd/rgpd.component';
import {InstructionsComponent} from './03_instructions/instructions.component';
import {PrisePhotoRetryComponent} from './04_prise-photo-retry/prise-photo-retry.component';
import {PrisePhotoValidationComponent} from './04_prise-photo-validation/prise-photo-validation.component';
import {PrisePhotoComponent} from './04_prise-photo/prise-photo.component';
import {ChoixRenduComponent} from './05_choix-rendu/choix-rendu.component';
import {SelectionPseudoComponent} from './06_selection-pseudo/selection-pseudo.component';
import {ImpressionPhotoComponent} from './07_impression-photo/impression-photo.component';
import {visualisationRoutes} from './visualisation.route';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [SelectionPseudoComponent, //
    PrisePhotoComponent, //
    ChoixRenduComponent, //
    AccueilComponent, //
    RgpdComponent,
    InstructionsComponent,
    PrisePhotoRetryComponent,
    PrisePhotoValidationComponent,
    ImpressionPhotoComponent],
  exports: [],
  imports: [
    RouterModule.forChild(visualisationRoutes),
    SharedLibModule,
    ReactiveFormsModule
  ],
  providers: [ImagesService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class VisualisationModule { }
