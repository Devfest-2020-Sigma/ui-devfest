import {Component} from '@angular/core';
import { ChargementIndicateurService } from 'src/app/core/service/loading-indicateur.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class ChargementComponent {

  constructor(private readonly chargementIndicatorService: ChargementIndicateurService) {
  }

  estChargementEnCours() {
    return this.chargementIndicatorService.nombreChargementsEnCours > 0;
  }
}
