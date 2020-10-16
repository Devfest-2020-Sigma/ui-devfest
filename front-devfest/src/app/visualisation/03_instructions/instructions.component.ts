import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html'
})
export class InstructionsComponent implements OnInit {
  constructor(private router: Router){}

  ngOnInit(): void {
  }
  
  onValidation(): void {
    this.router.navigate(["visualisation/prise-photo"]);
  }
}
