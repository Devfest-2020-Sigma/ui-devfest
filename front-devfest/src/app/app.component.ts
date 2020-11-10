import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bounceIn } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations : [
    bounceIn
  ]
})
export class AppComponent {
  title = 'front-devfest';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
