import { Route } from '@angular/router';
import { AccueilFilRougeComponent } from '../01_accueil/accueil-filrouge.component';
import { TenterChanceComponent } from '../02_tenter-chance/tenter-chance.component';
import { QuiEtesVousComponent } from '../03_qui-etes-vous/qui-etes-vous.component';
import { MailComponent } from '../04_mail/mail.component';
import { StayInTouchComponent } from '../05_stay-in-touch/stay-in-touch.component';
import { MerciComponent } from '../06_merci/merci.component';

export const filrougeMainRoute: Route[] = [
    {
        path : '',
        component : AccueilFilRougeComponent
    },
    {
        path : 'tenter-chance',
        component : TenterChanceComponent
    },
    {
        path : 'qui-etes-vous',
        component : QuiEtesVousComponent
    },
    {
        path : 'mail',
        component : MailComponent
    },
    {
        path : 'stay-in-touch',
        component : StayInTouchComponent
    },
    {
        path : 'merci',
        component : MerciComponent
    }
];
