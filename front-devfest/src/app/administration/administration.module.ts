import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedLibModule } from '../shared/shared-lib.module';
import { administrationRoutes } from './administration.route';
import { ListeRobotsComponent } from './liste-robots/liste-robots.component';
import { RobotsService } from '../core/service/robots.service';


@NgModule({
  declarations: [
    ListeRobotsComponent
  ],
  imports: [
    RouterModule.forChild(administrationRoutes),
    SharedLibModule
  ],
  providers: [RobotsService]
})
export class AdministrationModule { }
