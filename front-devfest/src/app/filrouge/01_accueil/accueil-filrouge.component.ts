import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-accueil-filrouge',
  templateUrl: './accueil-filrouge.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class AccueilFilRougeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCommencer(): void {
    this.router.navigate(['filrouge/tenter-chance']);
  }
}
