import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }
 
  onCommencer() : void{
    this.router.navigate(["visualisation/rgpd"]);
  }
}
