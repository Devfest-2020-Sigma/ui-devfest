import {Routes} from '@angular/router';
import { administrationMainRoute } from './administration-main/administration-main.route';

const ADMINISTRATION_ROUTES = [...administrationMainRoute];

export const administrationRoutes: Routes = [
  {
    path: 'administration',
    children: ADMINISTRATION_ROUTES,
    canActivate: []
  }
];
