import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../core/model/image.model';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ImagesService } from '../../core/service/images.service';
import { interval, of } from 'rxjs';
import { concatMapTo, delay, take } from 'rxjs/operators';

@Component({
  selector: 'app-selection-photo-mosaic',
  templateUrl: './selection-photo-mosaic.component.html'
})
export class SelectionPhotoMosaicComponent implements OnInit {

  @Input() image: Image;
  @Input() stepper: MatStepper;
  @Input() step: MatStep;

  public sampleInterval = interval(500).pipe(take(15));


  public imageUpload;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.stepper.selectionChange.subscribe((event: any) => {
      if (event.selectedStep === this.step) {
        const fakeRequest = this.imagesService.recupererImage(this.image._id).pipe(delay(3000));
        //wait for first to complete before next is subscribed
        const example = this.sampleInterval.pipe(concatMapTo(fakeRequest));
        example.subscribe(value => {
          console.log(value);
        });
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