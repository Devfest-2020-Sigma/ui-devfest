import {Component, OnInit, ViewChild} from '@angular/core';
import {Image} from '../../core/model/image.model';
import { SelectionPseudoComponent } from '../03_selection-pseudo/selection-pseudo.component';


@Component({
  selector: 'app-visualisation-main',
  templateUrl: './visualisation-main.component.html'
})
export class VisualisationMainComponent implements OnInit {

  @ViewChild(SelectionPseudoComponent) selectionPseudoComponent: SelectionPseudoComponent;
  public image: Image = new Image();

  constructor() {}

  ngOnInit() {
  }

  get stepPseudo() {
    return this.selectionPseudoComponent ? this.selectionPseudoComponent.form : null;
  }
}
