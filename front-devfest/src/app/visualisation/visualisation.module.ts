import {NgModule} from '@angular/core';
import {VisualisationMainComponent} from './visualisation-main/visualisation-main.component';
import {RouterModule} from '@angular/router';
import {visualisationRoutes} from './visualisation.route';
import {SharedLibModule} from '../shared/shared-lib.module';
import {ReactiveFormsModule} from '@angular/forms';

import {ImagesService} from '../core/service/images.service';
import { SelectionPseudoComponent } from './03_selection-pseudo/selection-pseudo.component';
import { PrisePhotoComponent } from './01_prise-photo/prise-photo.component';
import { SelectionPhotoMosaicComponent } from './02_selection-photo-mosaic/selection-photo-mosaic.component';
import { ImpressionPhotoComponent } from './04_impression-photo/impression-photo.component';


@NgModule({
  declarations: [VisualisationMainComponent, //
    SelectionPseudoComponent, //
    SelectionPhotoMosaicComponent, //
    PrisePhotoComponent,
  ImpressionPhotoComponent],
  exports: [
    VisualisationMainComponent
  ],
  imports: [
    RouterModule.forChild(visualisationRoutes),
    SharedLibModule,
    ReactiveFormsModule,
  ],
  providers: [ImagesService]
})
export class VisualisationModule { }
