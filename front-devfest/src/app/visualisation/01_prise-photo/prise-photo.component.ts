import { Component, Input, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Image } from '../../core/model/image.model';
import { ImagesService } from '../../core/service/images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prise-photo',
  templateUrl: './prise-photo.component.html'
})
export class PrisePhotoComponent implements OnInit {

  @Input() image: Image;
  private imageData : string;

  public facingMode = 'environment';
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // latest snapshot

  constructor(private imagesService: ImagesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.imageData = webcamImage.imageAsDataUrl;
  }

  /**
   * Capture de la photo et passage ‡ l'Ècran suivant et affichage de la mosaic
   */
  public onCapturer(): void {
    this.imagesService.initialiserWorkflow().subscribe(image => {
      // On met √† jour l'id initilis√© depuis la BDD
      this.router.navigate(["visualisation/selection-photo", image._id]);
    });
  }
}
