import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-impression-photo',
  templateUrl: './impression-photo.component.html'
})
export class ImpressionPhotoComponent implements OnInit {

  constructor(private imagesService : ImagesService) { }

  ngOnInit(): void {
  }

  imprimer(): void{
    /*this.imagesService.impressionImage(this.image).subscribe(value => {
      console.log(value);
    });*/
  }
}
