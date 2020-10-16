import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { interval, Subscription } from 'rxjs';
import { concatMapTo, delay, take, takeUntil, takeWhile } from 'rxjs/operators';
import { ImageEtatEnum } from 'src/app/core/model/image.etat.enum';
import { ImageRenduEnum } from 'src/app/core/model/image.rendu.enum';
import { ImagesService } from 'src/app/core/service/images.service';

@Component({
  selector: 'app-choix-rendu',
  templateUrl: './choix-rendu.component.html'
})
export class ChoixRenduComponent implements OnInit, OnDestroy {

  public interval = interval(500).pipe(take(15));
  private readonly subscriptions: Subscription[] = [];

  private id: string;
  public imageSetJpgLite = false;
  public imageSetTsp = false;
  public imageSetSquiddle = false;

  constructor(private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private iconReg: SvgIconRegistryService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (!!params.id) {
        this.id = params.id;
      }
    });
    const requete = this.imagesService.recupererImage(this.id).pipe(delay(3000));
    //wait for first to complete before next is subscribed
    const requetes = this.interval.pipe(concatMapTo(requete));
    this.subscriptions.push(
      requetes.pipe(
        takeWhile(value => !this.imageSetJpgLite || !this.imageSetSquiddle || !this.imageSetTsp)
      ).subscribe(image => {
        // Si on a pas déja chargé l'image et qu'elle est disponible
        if (!this.imageSetJpgLite && image.renduJpegLite) {
          this.imagesService.recupererImagesSVG(this.id, ImageRenduEnum.JPGLITE).subscribe(value => {
            this.iconReg.addSvg('svgJpgLite', value);
            this.imageSetJpgLite = true;
          });
        }
        // Si on a pas déja chargé l'image et qu'elle est disponible
        if (!this.imageSetTsp && image.renduJpegTsp) {
          this.imagesService.recupererImagesSVG(this.id, ImageRenduEnum.TSP).subscribe(value => {
            this.iconReg.addSvg('svgTsp', value);
            this.imageSetTsp = true;
          });
        }
        // Si on a pas déja chargé l'image et qu'elle est disponible
        if (!this.imageSetSquiddle && image.renduJpegSquiddle) {
          this.imagesService.recupererImagesSVG(this.id, ImageRenduEnum.SQUIDDLE).subscribe(value => {
            this.iconReg.addSvg('svgSquiddle', value);
            this.imageSetSquiddle = true;
          });
        }
      })
    );
  }

  imprimer(): void {
    this.imagesService.impressionImage(this.id).subscribe(value => {
      this.router.navigate(["visualisation/impression", this.id]);
    });
  }
}
