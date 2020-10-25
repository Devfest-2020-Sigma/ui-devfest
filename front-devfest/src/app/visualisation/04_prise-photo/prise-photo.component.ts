import { animate, style, transition, trigger } from '@angular/animations';
import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo',
  templateUrl: './prise-photo.component.html',
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateX(400px)' }),
        animate(350)
      ])
    ])
  ]
})
export class PrisePhotoComponent implements OnInit, AfterViewInit {

  @ViewChild('streaming', { static: false }) streamingcanvas: ElementRef;
  private id: string;
  private essai: string;

  constructor(private imagesService: ImagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imagesService.demarrerStreaming().subscribe();
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
      if (params.essai) {
        this.essai = params.essai;
      }
    });
  }

  ngAfterViewInit(): void {
    var url = 'ws://' + document.location.hostname + ':8082/';
    let player = new JSMpeg.Player(url, {
      canvas: this.streamingcanvas.nativeElement, autoplay: true, audio: false, loop: true
    });
    setTimeout(() => {
      // Capture de la photo et passage à l'écran suivant
      this.imagesService.prisePhoto(this.id, this.essai).subscribe(image => {
        if (this.essai === '1'){
          this.router.navigate(["visualisation/prise-photo-retry", image._id]);  
        } else {
          this.router.navigate(["visualisation/prise-photo-validation", image._id]);  
        }
        
      });
    }, 3000);
  }
}
