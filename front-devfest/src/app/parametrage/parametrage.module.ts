import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {parametrageRoutes} from './parametrage.route';
import { SharedLibModule } from '../shared/shared-lib.module';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(parametrageRoutes),
    SharedLibModule
  ]
})
export class ParametrageModule { }
