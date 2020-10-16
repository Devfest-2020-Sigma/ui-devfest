import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { concatMapTo, delay, filter, switchMap, take, takeWhile } from 'rxjs/operators';
import { ImageEtatEnum } from 'src/app/core/model/image.etat.enum';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-selection-photo-mosaic',
  templateUrl: './selection-photo-mosaic.component.html'
})
export class SelectionPhotoMosaicComponent implements OnInit, OnDestroy {
  public interval = interval(500).pipe(take(15));
  private readonly subscriptions: Subscription[] = [];
  public imageUpload: any;

  private id: string;
  private mosaicChargee = false;

  constructor(private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!!params.id) {
        this.id = params.id;
      }
      const requete = this.imagesService.recupererImage(this.id).pipe(delay(3000));
      //wait for first to complete before next is subscribed
      const requetes = this.interval.pipe(concatMapTo(requete));
      this.subscriptions.push(
        requetes.pipe(
          takeWhile(image => this.mosaicChargee === false),
          filter(image => image.etat === ImageEtatEnum.PRISE_PHOTO_EFFECTUEE)
        ).subscribe(image => {
          this.imagesService.recupererMosaic(this.id).subscribe(value => {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageUpload = reader.result as string;
            }
            reader.readAsDataURL(value);
            this.mosaicChargee = true;
            console.log(this.mosaicChargee);
          });
        })
      );
    });
  }

  selectionImage(event: any): void {
    // On indique l'image selectionnée dans la mosaique
    const x = event.pageX / window.innerWidth * 100;
    const y = event.pageY / window.innerHeight * 100;
    let imageSelectionnee = 0;
    if (x < 50 && y < 50) {
      imageSelectionnee = 1;
    } else if (x > 50 && y < 50) {
      imageSelectionnee = 2;
    } else if (x < 50 && y > 50) {
      imageSelectionnee = 3;
    } else {
      imageSelectionnee = 4;
    }
    this.router.navigate(["visualisation/selection-pseudo", this.id, imageSelectionnee]);
  }
}