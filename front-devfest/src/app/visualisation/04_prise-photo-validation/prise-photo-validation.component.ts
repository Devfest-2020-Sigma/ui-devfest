import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo-validation',
  templateUrl: './prise-photo-validation.component.html'
})
export class PrisePhotoValidationComponent implements OnInit {

  private id: string;

  constructor(private imagesService: ImagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
  }
  
  onValidation(): void {
    this.router.navigate(["visualisation/choix-rendu", this.id]);
  }
}
