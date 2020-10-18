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

  constructor(private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router){
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
  }

  onChoisir(): void {
  }
}
