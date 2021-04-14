import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { take, takeWhile, filter, concatMapTo, delay } from 'rxjs/operators';
import { ImageEtatEnum } from 'src/app/core/model/image.etat.enum';
import { Image } from 'src/app/core/model/image.model';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-prise-photo-retry',
  templateUrl: './prise-photo-retry.component.html'
})
export class PrisePhotoRetryComponent implements OnInit, OnDestroy {

  private id :string;
  private readonly subscriptions: Subscription[] = [];
  public imageUpload: any;
  private imageChargee = false;

  constructor(private imagesService: ImagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imagesService.demarrerStreaming().subscribe();
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
    const requete = this.imagesService.recupererImage(this.id);
    const requetes = interval(1000).pipe(
      takeWhile(() => this.imageChargee === false),
      concatMapTo(requete));
    this.subscriptions.push(
      requetes.pipe(
        filter(image => image.etat === ImageEtatEnum.PRISE_PHOTO_EFFECTUEE)
      ).subscribe(() => {
        // on charge la première image capturée
        this.imagesService.recupererPhoto(this.id, "1").subscribe(value => {
          this.imageChargee = true;
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUpload = reader.result as string;
          }
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
    let image = new Image;
    image._id = this.id;
    image.imageSelectionnee =  1;
    this.imagesService.miseAjourImageBdd(image).subscribe(() => {
    this.router.navigate(["visualisation/choix-rendu", this.id]);
    });
  }

  onRetry(): void{
    this.router.navigate(["visualisation/prise-photo", this.id, 2]);
  }
}
