import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SWIPER_CONFIG, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ImagesService} from '@service/images.service';
import {SharedLibModule} from '../shared/shared-lib.module';
import {AccueilFilRougeComponent} from './01_accueil/accueil-filrouge.component';
import {TenterChanceComponent} from './02_tenter-chance/tenter-chance.component';
import {QuiEtesVousComponent} from './03_qui-etes-vous/qui-etes-vous.component';
import {MailComponent} from './04_mail/mail.component';
import {StayInTouchComponent} from './05_stay-in-touch/stay-in-touch.component';
import {MerciComponent} from './06_merci/merci.component';
import {filrougeRoutes} from './filrouge.route';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AccueilFilRougeComponent,
    TenterChanceComponent,
    QuiEtesVousComponent,
    MailComponent,
    StayInTouchComponent,
    MerciComponent
  ],
  exports: [],
  imports: [
    RouterModule.forChild(filrougeRoutes),
    SharedLibModule,
    ReactiveFormsModule,
  ],
  providers: [ImagesService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class FilRougeModule { }
