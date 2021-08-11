import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-stay-in-touch',
  templateUrl: './stay-in-touch.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class StayInTouchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }

  onCestParti(): void {
    this.router.navigate(['filrouge/merci']);
  }

  onNonMerci(): void
  {
    this.router.navigate(['filrouge/merci']);
  }
}
