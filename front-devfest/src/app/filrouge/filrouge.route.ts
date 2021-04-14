import {Routes} from '@angular/router';
import {filrougeMainRoute} from './filrouge-main/filrouge-main.route';

const FILROUGE_ROUTES = [...filrougeMainRoute];

export const filrougeRoutes: Routes = [
  {
    path: 'filrouge',
    children: FILROUGE_ROUTES,
    canActivate: []
  }
];
