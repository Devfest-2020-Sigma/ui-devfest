import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeInOnEnterAnimation, slideInRightOnEnterAnimation} from 'angular-animations';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  animations: [
    slideInRightOnEnterAnimation({duration: 400}),
    fadeInOnEnterAnimation({duration: 400}),
    trigger('devFestAnimation', [
      transition(':enter', [
        style({transform: 'translateY(500px) translateX(200px) scale(3)'}),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ]),
    trigger('xAnimation', [
      transition(':enter', [
        style({transform: 'translateY(550px) scale(2)'}),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ]),
    trigger('sigmaAnimation', [
      transition(':enter', [
        style({transform: 'translateY(600px) translateX(-200px) scale(2)'}),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ]),
  ]
})
export class RgpdComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onValidation(): void {
    this.router.navigate(['visualisation/instructions']);
  }

}
