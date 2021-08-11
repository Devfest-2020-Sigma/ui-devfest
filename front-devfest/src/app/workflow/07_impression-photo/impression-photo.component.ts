import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {bounceInDownOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-impression-photo',
  templateUrl: './impression-photo.component.html',
  animations: [
    bounceInDownOnEnterAnimation()
  ]
})
export class ImpressionPhotoComponent implements OnInit
{


  constructor(private router: Router) { }

  ngOnInit(): void {
    // Nothing
  }

  onCompris(): void
  {
    // on retourne à l'accueil
    this.router.navigate(['']);
  }

}
