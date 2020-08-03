import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../core/model/image.model';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ImagesService } from '../../core/service/images.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-selection-photo-mosaic',
  templateUrl: './selection-photo-mosaic.component.html'
})
export class SelectionPhotoMosaicComponent implements OnInit {

  @Input() image: Image;
  @Input() stepper: MatStepper;
  @Input() step: MatStep;

  public imageUpload;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.stepper.selectionChange.subscribe((event: any) => {
      if (event.selectedStep === this.step) {
        const imgUrl = this.imagesService.recupererMosaic(this.image)
        this.imageUpload = imgUrl;
      }
    });
  }

  selectionImage(): void {
    // On indique l'image selectionnée dans la mosaique
    this.image.imageSelectionnee = 1;
    this.stepper.next();
  }
}