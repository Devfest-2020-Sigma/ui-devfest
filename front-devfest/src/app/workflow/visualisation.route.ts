import {Routes} from '@angular/router';
import {visualisationMainRoute} from './visualisation-main/visualisation-main.route';

const VISUALISATION_ROUTES = [...visualisationMainRoute];

export const visualisationRoutes: Routes = [
  {
    path: 'visualisation',
    children: VISUALISATION_ROUTES,
    canActivate: []
  }
];
