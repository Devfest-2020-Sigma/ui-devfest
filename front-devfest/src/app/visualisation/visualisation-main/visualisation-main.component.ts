import { Component, OnInit } from '@angular/core';
import { Image } from '../../core/model/image.model';


@Component({
  selector: 'app-visualisation-main',
  templateUrl: './visualisation-main.component.html'
})
export class VisualisationMainComponent implements OnInit {

  public image: Image = new Image();

  constructor() {}

  ngOnInit() {
  }
}
