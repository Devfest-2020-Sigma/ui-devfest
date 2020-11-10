import {animate, AnimationEvent, keyframes, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagesService} from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo',
  templateUrl: './prise-photo.component.html',
  animations: [
    trigger('decompteAnim', [
      transition(':enter',
        animate('2s 0ms', keyframes([
          style({transform: 'translateX(300%)', easing: 'ease', opacity: 0, offset: 0}),
          style({transform: 'translateX(0)', easing: 'ease', opacity: 1, offset: 0.2}),
          style({transform: 'translateX(0)', easing: 'ease', opacity: 1, offset: 0.8}),
          style({transform: 'translateX(-300%)', easing: 'ease', opacity: 0, offset: 1})
        ]))
      )
    ])
  ]
})
export class PrisePhotoComponent implements OnInit, AfterViewInit {

  @ViewChild('streaming', {static: false}) streamingcanvas: ElementRef;
  private id: string;
  private essai: string;
  public afficher = true;
  public decompte = '3';

  constructor(private imagesService: ImagesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
      if (params.essai) {
        this.essai = params.essai;
      }
    });


    // const requetes = interval(1000).pipe(take(15)).pipe(concatMapTo(()=> {));
    // requetes.subscribe();
  }

  onDecompteDoneEvent(event: AnimationEvent) {

    if (this.decompte === '😊') {
      return;
    }

    if (this.decompte === '0') {
      this.decompte = '😊';
    }

    if (event.toState === null) {
      // utilisation de l'opérateur + pour transformer string -> nombre en typescript
      this.decompte = (+this.decompte - 1).toString();
      this.afficher = false;
    } else {
      this.afficher = true;
    }
  }

  ngAfterViewInit(): void {
    const url = 'ws://' + document.location.hostname + ':8082/';
    // let player = new JSMpeg.Player(url, {
    //   canvas: this.streamingcanvas.nativeElement, autoplay: true, audio: false, loop: true
    // });
    /*  setTimeout(() => {
        // Capture de la photo et passage à l'écran suivant
        this.imagesService.prisePhoto(this.id, this.essai).subscribe(image => {
          if (this.essai === '1'){
            this.router.navigate(["visualisation/prise-photo-retry", image._id]);
          } else {
            this.router.navigate(["visualisation/prise-photo-validation", image._id]);
          }

        });
      }, 3000);*/
  }
}
