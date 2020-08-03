import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Image} from '../../core/model/image.model';
import {ImagesService} from '../../core/service/images.service';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-selection-pseudo',
  templateUrl: './selection-pseudo.component.html'
})
export class SelectionPseudoComponent implements OnInit {

  public form: FormGroup;
  @Input() public image: Image;
  @Input() stepper: MatStepper;

  constructor(private formBuilder: FormBuilder,
              private imagesService: ImagesService) {
    this.form = this.formBuilder.group({
      pseudoCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.get('pseudoCtrl').valueChanges
    .subscribe(val => {
      this.image.pseudo = val;
    });
  }

  validerPseudo(){
    this.imagesService.miseAjourPseudo(this.image).subscribe(value => {
      this.stepper.next();
    });
  }
}
