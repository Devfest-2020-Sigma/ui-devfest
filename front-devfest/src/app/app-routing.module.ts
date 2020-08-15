import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { visualisationRoutes } from './visualisation/visualisation.route';

const routes: Routes = [...visualisationRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

