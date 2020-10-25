import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impression-photo',
  templateUrl: './impression-photo.component.html'
})
export class ImpressionPhotoComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  onCompris() : void  {
    // on retourne à l'accueil
    this.router.navigate([""]);
  }

}
