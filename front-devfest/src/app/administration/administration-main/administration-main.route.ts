import { Route } from '@angular/router';
import { ListeRobotsComponent } from '../liste-robots/liste-robots.component';


export const administrationMainRoute: Route[] = [
  {
    path: '',
    component: ListeRobotsComponent,
    canActivate: []
  }];
