import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ImagesService} from 'src/app/core/service/images.service';
import {fadeInRightBigOnEnterAnimation, fadeOutUpBigOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  animations: [
    fadeInRightBigOnEnterAnimation({duration: 400}),
    fadeOutUpBigOnLeaveAnimation({duration: 500})
  ]
})
export class InstructionsComponent implements OnInit {
  public fondVioletAffiche = true;

  constructor(private router: Router,
              private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.fondVioletAffiche = false, 100);
  }

  onValidation(): void {
    // Initialisation du workflow et naviagation vers la page de prise de photo
    this.imagesService.initialiserWorkflow().subscribe(image => {
      this.router.navigate(['visualisation/prise-photo', image._id, 1]);
    });
  }
}
