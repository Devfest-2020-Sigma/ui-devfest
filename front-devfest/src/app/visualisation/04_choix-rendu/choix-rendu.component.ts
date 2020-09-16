import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { ImagesService } from 'src/app/core/service/images.service';

@Component({
  selector: 'app-choix-rendu',
  templateUrl: './choix-rendu.component.html'
})
export class ChoixRenduComponent implements OnInit {

  private id: string;
  public imageSet = false;

  constructor(private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private iconReg:SvgIconRegistryService) {
    }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (!!params.id) {
        this.id = params.id;
      }
    });
    this.imagesService.recupererImagesSVG(this.id).subscribe(value => {
      this.iconReg.addSvg('svg', value);
      this.imageSet= true;
    });
  }
  
  validerChoix() {
    this.router.navigate(["visualisation/impression", this.id]);
  }

  imprimer(): void {
    this.imagesService.impressionImage(this.id).subscribe(value => {
      console.log(value);
    });
  }
}
