import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  animations: [
    trigger('boutonAnimation', [
      transition(':enter', [
        style({right: '-400%'}),
        animate('.2s ease-in-out', style({ right: 0 }))
      ])
    ])
  ]
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }
 
  onCommencer() : void{
    this.router.navigate(["visualisation/rgpd"]);
  }
}
