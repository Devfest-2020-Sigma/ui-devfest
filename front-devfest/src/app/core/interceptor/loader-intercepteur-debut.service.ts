import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {ChargementIndicateurService} from '@service/loading-indicateur.service';

// tslint:disable:no-any
@Injectable({providedIn: 'root'})
export class ChargementIntercepteurDebutService implements HttpInterceptor {
  constructor(private readonly chargementIndicateurService: ChargementIndicateurService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.chargementIndicateurService.show(req);

    return next.handle(req);
  }
}
