import {Routes} from '@angular/router';

const PARAMETRAGE_ROUTES = [];

export const parametrageRoutes: Routes = [
  {
    path: 'parametrage',
    children: PARAMETRAGE_ROUTES,
    canActivate: []
  }
];
