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
        this.imagesService.recupererMosaic(this.image).subscribe(value =>{
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUpload = reader.result as string;
          }
          reader.readAsDataURL(value)
        });
      }
    });
  }

  selectionImage(event: any): void {
    // On indique l'image selectionnée dans la mosaique
    var x = event.pageX / window.innerWidth * 100;
    var y = event.pageY / window.innerHeight * 100;
    if (x < 50 && y < 50) {
      this.image.imageSelectionnee = 1;
    } else if (x > 50 && y < 50) {
      this.image.imageSelectionnee = 2;
    } else if (x < 50 && y > 50) {
      this.image.imageSelectionnee = 3;
    } else {
      this.image.imageSelectionnee = 4;
    }
    this.stepper.next();
  }
}