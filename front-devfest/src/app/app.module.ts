import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VisualisationModule} from './visualisation/visualisation.module';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {ParametrageModule} from './parametrage/parametrage.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedLibModule } from './shared/shared-lib.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AppRoutingModule,
    VisualisationModule,
    ParametrageModule,
    BrowserAnimationsModule,
    SharedLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
