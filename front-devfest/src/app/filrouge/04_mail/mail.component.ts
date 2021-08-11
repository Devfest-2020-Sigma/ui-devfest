import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class MailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }

  onContinuer(): void {
    this.router.navigate(['filrouge/stay-in-touch']);
  }
}
