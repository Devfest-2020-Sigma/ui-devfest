import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-qui-etes-vous',
  templateUrl: './qui-etes-vous.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class QuiEtesVousComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }

  onContinuer(): void {
    this.router.navigate(['filrouge/mail']);
  }
}
