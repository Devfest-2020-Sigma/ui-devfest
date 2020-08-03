import {Component, Input, OnInit} from '@angular/core';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {Image} from '../../core/model/image.model';
import {ImagesService} from '../../core/service/images.service';

@Component({
  selector: 'app-impression-photo',
  templateUrl: './impression-photo.component.html'
})
export class ImpressionPhotoComponent implements OnInit {

  @Input() image: Image;
  @Input() stepper: MatStepper;
  @Input() step: MatStep;

  constructor(private imagesService : ImagesService) { }

  ngOnInit(): void {
  }

  imprimer(): void{
    /*this.imagesService.impressionImage(this.image).subscribe(value => {
      console.log(value);
    });*/
  }
}
