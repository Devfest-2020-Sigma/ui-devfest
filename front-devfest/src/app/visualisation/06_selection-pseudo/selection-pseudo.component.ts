import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/core/model/image.model';
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

  constructor(private formBuilder: FormBuilder,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.formBuilder.group({
      pseudoCtrl: ['', Validators.maxLength(10)]
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
    });
  }

  validerPseudo() {
    let image = new Image;
    image._id = this.id;
    image.pseudo =  this.pseudo;
    this.imagesService.miseAjourImageBdd(image).subscribe(() => {
      this.imagesService.recupererImage(this.id).subscribe((value) => {
        console.log(value);
      });
      this.router.navigate(["visualisation/impression-photo"]);
    });
  }
}
