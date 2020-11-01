import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Image } from 'src/app/core/model/image.model';
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
  private renduSelectionne: ImageRenduEnum = ImageRenduEnum.JPGLITE;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

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
    let image = new Image;
    image._id = this.id;
    image.renduSelectionne = this.renduSelectionne;
    this.imagesService.miseAjourImageBdd(image).subscribe(() => {
      this.router.navigate(["visualisation/selection-pseudo", this.id]);
    });
  }
  
  public onIndexChange(index: number) {
    this.renduSelectionne = Object.keys(ImageRenduEnum).keys()[index];
  }
}
