import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ChargementIndicateurService} from '@service/loading-indicateur.service';

@Injectable({providedIn: 'root'})
export class ChargementIntercepteurFinService implements HttpInterceptor
{
  constructor(private readonly chargementIndicateurService: ChargementIndicateurService)
  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) =>
        {
          if (event instanceof HttpResponse)
          {
            this.chargementIndicateurService.hide();
          }
        },
        () =>
        {
          this.chargementIndicateurService.hide();
        }));

  }
}
