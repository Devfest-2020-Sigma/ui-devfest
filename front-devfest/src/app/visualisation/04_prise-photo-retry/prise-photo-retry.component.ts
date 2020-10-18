import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo-retry',
  templateUrl: './prise-photo-retry.component.html'
})
export class PrisePhotoRetryComponent implements OnInit {

  constructor(private imagesService: ImagesService,
    private router: Router) { }

  ngOnInit(): void {
    this.imagesService.demarrerStreaming().subscribe();
  }
  
  onValidation(): void {

  }
}
