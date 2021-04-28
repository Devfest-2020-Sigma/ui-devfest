import {animate, AnimationEvent, keyframes, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagesService} from '../../core/service/images.service';
import JSMpeg from '@cycjimmy/jsmpeg-player';

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
    ]),
    trigger('decompteAnim3', [
      transition(':leave',
        animate('2s 0ms', keyframes([
          style({transform: 'translateX(0)', easing: 'ease', opacity: 1, offset: 0}),
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
  public afficherDecompte = true;
  public afficherSmile = false;
  public afficherFlash = false;
  public decompte = 3;

  constructor(private imagesService: ImagesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

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


    // const requetes = interval(1000).pipe(take(15)).pipe(concatMapTo(()=> {));
    // requetes.subscribe();
  }

  onDecompteEnterDoneEvent(event: AnimationEvent) {
    // Si le décompte n'est pas déjà terminé
    if (!this.afficherSmile){
      if (this.decompte === 0) {
        this.afficherDecompte = true;
        this.afficherFlash = true;
        this.afficherSmile = true;
        this.capture();
        return;
      }

      if (event.toState === null) {
        this.decompte--;
        this.afficherDecompte = false;
      } else {
        this.afficherDecompte = true;
      }
    }
  }

  ngAfterViewInit(): void {
    var url = 'ws://' + document.location.hostname + ':8082/';
    let player = new JSMpeg.Player(url, {
      canvas: this.streamingcanvas.nativeElement, autoplay: true, audio: false, loop: true
    });
  }

  public capture(): void {
    console.log('capture');
    this.imagesService.prisePhoto(this.id, this.essai).subscribe(image => {
      if (+this.essai === 1) {
        this.router.navigate(["visualisation/prise-photo-retry", image._id]);
      } else {
        this.router.navigate(["visualisation/prise-photo-validation", image._id]);
      }
    });
  }
}
