import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  animations: [
    trigger('boutonAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate(500)
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
