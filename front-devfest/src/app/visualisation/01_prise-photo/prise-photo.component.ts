import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';
import {MatDialog} from '@angular/material/dialog';
import {MatStepper} from '@angular/material/stepper';
import {Image} from '../../core/model/image.model';
import {ImagesService} from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo',
  templateUrl: './prise-photo.component.html'
})
export class PrisePhotoComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() image: Image;
  private imageData : string;

  public facingMode = 'environment';
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // latest snapshot

  constructor(public dialog: MatDialog,
              public imagesService: ImagesService) { }

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
    this.imagesService.initialiserWorkflow().subscribe(value => {
      // On met √† jour l'id initilis√© depuis la BDD
      this.image._id = value._id;
      this.stepper.next();
    });
  }
}
