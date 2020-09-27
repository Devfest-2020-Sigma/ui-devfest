import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { interval, Subscription } from 'rxjs';
import { concatMapTo, delay, take } from 'rxjs/operators';
import { ImageEtatEnum } from 'src/app/core/model/image.etat.enum';
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
        requetes.subscribe(image => {
          if (image.renduJpegLite) {
            this.imagesService.recupererImagesSVG(this.id).subscribe(value => {
              this.iconReg.addSvg('svgJpgLite', value);
              this.imageSetJpgLite = true;
              this.iconReg.addSvg('svgTsp', value);
              this.imageSetTsp = true;
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
