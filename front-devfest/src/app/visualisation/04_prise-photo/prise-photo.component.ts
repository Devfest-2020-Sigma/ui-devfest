import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo',
  templateUrl: './prise-photo.component.html'
})
export class PrisePhotoComponent implements OnInit, AfterViewInit {

  @ViewChild('streaming', { static: false }) streamingcanvas: ElementRef;

  constructor(private imagesService: ImagesService,
    private router: Router) { }

  ngOnInit(): void {
    this.imagesService.demarrerStreaming().subscribe();
  }
  
  ngAfterViewInit(): void {
    var url = 'ws://' + document.location.hostname + ':8082/';
    let player = new JSMpeg.Player(url, {
      canvas: this.streamingcanvas.nativeElement, autoplay: true, audio: false, loop: true
    });
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
