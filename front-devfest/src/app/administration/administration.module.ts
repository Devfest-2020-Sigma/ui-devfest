import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { administrationRoutes } from './administration.route';
import { SharedLibModule } from '../shared/shared-lib.module';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(administrationRoutes),
    SharedLibModule
  ]
})
export class AdministrationModule { }
