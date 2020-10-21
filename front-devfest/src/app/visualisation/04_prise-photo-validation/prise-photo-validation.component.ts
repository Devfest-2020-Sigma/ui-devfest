import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo-validation',
  templateUrl: './prise-photo-validation.component.html'
})
export class PrisePhotoValidationComponent implements OnInit {

  constructor(private imagesService: ImagesService,
    private router: Router) { }

  ngOnInit(): void {
    this.imagesService.demarrerStreaming().subscribe();
  }
  
  onValidation(): void {

  }
}
