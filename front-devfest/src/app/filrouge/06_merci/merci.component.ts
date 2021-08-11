import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-merci',
  templateUrl: './merci.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class MerciComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }
}
