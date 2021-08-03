import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {visualisationRoutes} from './workflow/visualisation.route';

const routes: Routes = [{
  path: '',
  redirectTo: "/visualisation/accueil",
  pathMatch: 'full'
}, ...visualisationRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

