import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-tenter-chance',
  templateUrl: './tenter-chance.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class TenterChanceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }

  onContinuer(): void {
    this.router.navigate(['filrouge/qui-etes-vous']);
  }
}
