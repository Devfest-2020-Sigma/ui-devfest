import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInOnEnterAnimation, slideInUpOnEnterAnimation} from 'angular-animations';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper/public-api';
import {interval} from 'rxjs';
import {Subscription} from 'rxjs/internal/Subscription';
import {concatMapTo, filter, takeWhile} from 'rxjs/operators';
import {ImageEtatEnum} from 'src/app/core/model/image.etat.enum';
import {Image} from 'src/app/core/model/image.model';
import {ImagesService} from '@service/images.service';

@Component({
  selector: 'app-prise-photo-validation',
  templateUrl: './prise-photo-validation.component.html',
  animations: [
    fadeInOnEnterAnimation(),
    slideInUpOnEnterAnimation()
  ]
})
export class PrisePhotoValidationComponent implements OnInit, OnDestroy
{

  private id: string;
  private readonly subscriptions: Subscription[] = [];
  public imageUpload1: any;
  public imageUpload2: any;
  private imageChargee1 = false;
  private imageChargee2 = false;

  private imageSelectionnee = 2;

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
              private router: Router,
              private route: ActivatedRoute)
  {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
    {
      if (params.id)
      {
        this.id = params.id;
      }
    });
    const requete = this.imagesService.recupererImage(this.id);
    const requetes = interval(1000).pipe(
      takeWhile(() => this.imageChargee1 === false && this.imageChargee2 === false),
      concatMapTo(requete));
    this.subscriptions.push(
      requetes.pipe(
        filter(image => image.etat === ImageEtatEnum.PRISE_PHOTO_EFFECTUEE)
      ).subscribe(() => {
        // on charge la première image capturée
        this.imagesService.recupererPhoto(this.id, '1').subscribe(value =>
        {
          this.imageChargee1 = true;
          const reader = new FileReader();
          reader.onload = () =>
          {
            this.imageUpload1 = reader.result as string;
          };
          reader.readAsDataURL(value);
        });

        // on charge la deuxième image capturée
        this.imagesService.recupererPhoto(this.id, '2').subscribe(value =>
        {
          this.imageChargee2 = true;
          const reader = new FileReader();
          reader.onload = () =>
          {
            this.imageUpload2 = reader.result as string;
          };
          reader.readAsDataURL(value);
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  onValidation(): void {
    const image = new Image();
    image._id = this.id;
    image.imageSelectionnee = this.imageSelectionnee;
    this.imagesService.miseAjourImageBdd(image).subscribe(() =>
    {
      this.router.navigate(['visualisation/choix-rendu', this.id]);
    });
  }

  public onIndexChange(index: number)
  {
    if (index === 1)
    {
      this.imageSelectionnee = 2;
    }
    else
    {
      this.imageSelectionnee = 1;
    }
  }

  public onAnnuler(): void
  {
    // on retourne à l'accueil
    this.router.navigate(['']);
  }
}
