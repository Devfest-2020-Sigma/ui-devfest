import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from 'src/app/core/service/images.service';

@Component({
  selector: 'app-choix-rendu',
  templateUrl: './choix-rendu.component.html'
})
export class ChoixRenduComponent implements OnInit {

  private id: string;

  constructor(private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (!!params.id) {
        this.id = params.id;
      }
    });
  }
  
  validerChoix() {
    this.router.navigate(["visualisation/impression", this.id]);
  }
}
