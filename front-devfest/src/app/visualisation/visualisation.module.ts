import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImagesService } from '../core/service/images.service';
import { SharedLibModule } from '../shared/shared-lib.module';
import { PrisePhotoComponent } from './01_prise-photo/prise-photo.component';
import { SelectionPhotoMosaicComponent } from './02_selection-photo-mosaic/selection-photo-mosaic.component';
import { SelectionPseudoComponent } from './03_selection-pseudo/selection-pseudo.component';
import { ImpressionPhotoComponent } from './04_impression-photo/impression-photo.component';
import { visualisationRoutes } from './visualisation.route';



@NgModule({
  declarations: [SelectionPseudoComponent, //
    SelectionPhotoMosaicComponent, //
    PrisePhotoComponent,
  ImpressionPhotoComponent],
  exports: [],
  imports: [
    RouterModule.forChild(visualisationRoutes),
    SharedLibModule,
    ReactiveFormsModule,
  ],
  providers: [ImagesService]
})
export class VisualisationModule { }
