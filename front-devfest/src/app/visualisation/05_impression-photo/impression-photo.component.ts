import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, concatMapTo } from 'rxjs/operators';
import { ImageEtatEnum } from 'src/app/core/model/image.etat.enum';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-impression-photo',
  templateUrl: './impression-photo.component.html'
})
export class ImpressionPhotoComponent implements OnInit {

  private id: string;

  constructor(private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!!params.id) {
        this.id = params.id;
      }
    });
}

  imprimer(): void {
    this.imagesService.impressionImage(this.id).subscribe(value => {
      console.log(value);
    });
  }
}
