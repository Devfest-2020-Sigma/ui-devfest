import { trigger, transition, style, animate, state, stagger, query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  animations: [
    trigger('textAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(250)
      ])
    ])
  ]
})
export class RgpdComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onValidation(): void {
    this.router.navigate(["visualisation/instructions"]);
  }

}
