import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html'
})
export class RgpdComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  onValidation(): void {
    this.router.navigate(["visualisation/instructions"]);
  }
  
}
