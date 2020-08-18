import {Routes} from '@angular/router';

const ADMINISTRATION_ROUTES = [];

export const administrationRoutes: Routes = [
  {
    path: 'administration',
    children: ADMINISTRATION_ROUTES,
    canActivate: []
  }
];
