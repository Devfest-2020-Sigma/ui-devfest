import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Keyboard from 'simple-keyboard';
import { ImagesService } from '../../core/service/images.service';

@Component({
  selector: 'app-selection-pseudo',
  templateUrl: './selection-pseudo.component.html'
})
export class SelectionPseudoComponent implements OnInit {

  public form: FormGroup;
  public pseudo: string = "";
  private id: string;
  private numero: number;
  private keyboard: Keyboard;



  constructor(private formBuilder: FormBuilder,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.formBuilder.group({
      pseudoCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.get('pseudoCtrl').valueChanges
      .subscribe(val => {
        this.pseudo = val;
      });
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
      if (params.numero) {
        this.numero = params.numero;
      }   
    });
  }

  validerPseudo() {
    this.imagesService.genererSVG(this.id, this.numero, this.pseudo).subscribe(value => {
      this.router.navigate(["visualisation/choix-rendu", this.id]);
    });
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.pseudo = input;
  };

  onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
