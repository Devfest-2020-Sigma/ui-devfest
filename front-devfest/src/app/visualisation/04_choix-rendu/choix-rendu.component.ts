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
  public imageSetJpgLite = false;
  public imageSetTsp = false;
  public imageSetSquiddle = false;

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
      this.iconReg.addSvg('svgJpgLite', value);
      this.imageSetJpgLite= true;
      this.iconReg.addSvg('svgTsp', value);
      this.imageSetTsp= true;
      this.iconReg.addSvg('svgSquiddle', value);
      this.imageSetSquiddle= true;
    });
  }
  
  imprimer(): void {
    this.imagesService.impressionImage(this.id).subscribe(value => {
      this.router.navigate(["visualisation/impression", this.id]);
    });
  }
}
