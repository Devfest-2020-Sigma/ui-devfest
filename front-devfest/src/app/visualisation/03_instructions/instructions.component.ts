import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/core/service/images.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html'
})
export class InstructionsComponent implements OnInit {
  constructor(private router: Router,
    private imagesService: ImagesService,) { }

  ngOnInit(): void {
  }

  onValidation(): void {
    // Initialisation du workflow et naviagation vers la page de prise de photo
    this.imagesService.initialiserWorkflow().subscribe(image => {
      this.router.navigate(["visualisation/prise-photo", image._id, 1]);
    });
  }
}
