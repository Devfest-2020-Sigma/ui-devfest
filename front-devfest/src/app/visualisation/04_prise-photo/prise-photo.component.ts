import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo',
  templateUrl: './prise-photo.component.html',
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        animate(
          '1000ms 0ms',
          keyframes([
            style({ visibility: 'visible', transform: 'translate3d(300%, 0, 0)', easing: 'ease', offset: 0 }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
          ])
        )
      ]),
      transition(':leave', [
        animate(
          '1000ms 0ms',
          keyframes([
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({ transform: 'translate3d(-300%, 0, 0)', visibility: 'hidden', easing: 'ease', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class PrisePhotoComponent implements OnInit, AfterViewInit {

  @ViewChild('streaming', { static: false }) streamingcanvas: ElementRef;
  private id: string;
  private essai: string;
  public afficherDecompte = true;
  public afficherSmile = false;
  public afficherFlash = false;
  public decompte = 3;

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

    interval(1000).pipe(take(7)).pipe(
      tap(()=>{
        if(this.decompte >= 1) {
          this.afficherDecompte = !this.afficherDecompte;
        } else{
          this.afficherSmile =true;
          if (this.decompte === 0.5){
            this.afficherFlash = true;
          } else{
            this.afficherFlash = false;
          }
          if (this.decompte < 0){
            this.capture();
          }
        }
        this.decompte = this.decompte - 0.5;
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    var url = 'ws://' + document.location.hostname + ':8082/';
    let player = new JSMpeg.Player(url, {
      canvas: this.streamingcanvas.nativeElement, autoplay: true, audio: false, loop: true
    });
  }

  public capture() : void {
    this.imagesService.prisePhoto(this.id, this.essai).subscribe(image => {
      if (this.essai === '1'){
        this.router.navigate(["visualisation/prise-photo-retry", image._id]);  
      } else {
        this.router.navigate(["visualisation/prise-photo-validation", image._id]);  
      }
    });
  }
}
