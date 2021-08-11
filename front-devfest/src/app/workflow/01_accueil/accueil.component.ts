import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }

  onCommencer(): void {
    this.router.navigate(['visualisation/rgpd']);
  }
}
