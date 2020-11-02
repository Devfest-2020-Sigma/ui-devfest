import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  animations: [
    trigger('boutonAnimation', [
      transition(':enter', [
        animate(
          '1000ms 0ms',
          keyframes([
            style({ visibility: 'visible', transform: 'translate3d(0, 100%, 0)', easing: 'ease', offset: 0 }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCommencer(): void {
    this.router.navigate(["visualisation/rgpd"]);
  }
}
