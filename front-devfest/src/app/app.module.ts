import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedLibModule } from './shared/shared-lib.module';
import { VisualisationModule } from './visualisation/visualisation.module';
import { AdministrationModule } from './administration/administration.module';
import { ChargementIndicateurService } from './core/service/loading-indicateur.service';
import { ChargementIntercepteurDebutService } from './core/interceptor/loader-intercepteur-debut.service';
import { ChargementIntercepteurFinService } from './core/interceptor/loader-intercepteur-fin.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AppRoutingModule,
    VisualisationModule,
    AdministrationModule,
    BrowserAnimationsModule,
    SharedLibModule,
    FontAwesomeModule
  ],
  providers: [ChargementIndicateurService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ChargementIntercepteurDebutService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ChargementIntercepteurFinService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
