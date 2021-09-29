import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Image} from 'src/app/core/model/image.model';
import {ImagesService} from '@service/images.service';
import Keyboard from 'simple-keyboard';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-selection-pseudo',
    templateUrl: './selection-pseudo.component.html'
})
export class SelectionPseudoComponent implements OnInit, AfterViewInit
{

    keyboard: Keyboard;
    private lockActivated = false;

    public form: FormGroup;
    public pseudo = '';
    private id: string;

    constructor(private formBuilder: FormBuilder,
                private imagesService: ImagesService,
                private route: ActivatedRoute,
                private router: Router)
    {
        this.initialiserControls();
    }

    ngOnInit()
    {
        this.form.get('pseudoCtrl').valueChanges
            .subscribe(val =>
            {
                this.pseudo = val;
            });
        this.route.params.subscribe((params) =>
        {
            if (params.id)
            {
                this.id = params.id;
            }
        });
    }

    ngAfterViewInit()
    {
        this.keyboard = new Keyboard({
            layoutName: 'sigma-no',
            theme: 'keyboard-blur hg-theme-default hg-layout',
            layout: {
                sigma: [
                    'a z e r t y',
                    'u i o p q s',
                    'd f g h j k',
                    'l m w x c v',
                    'b n , . ;',
                    '{bksp} {lock} {shift} {space}',
                    '{enter}'
                ],
                'sigma-shift': [
                    'A Z E R T Y',
                    'U I O P Q S',
                    'D F G H J K ',
                    'L M W X C V',
                    ' B N , . ;',
                    '{bksp} {lock} {shift} {space}',
                    '{enter}'
                ],
                'sigma-no': [
                    'a z e r t y',
                    'u i o p q s',
                    'd f g h j k',
                    'l m w x c v',
                    'b n , . ;',
                    '{bksp} {lock} {shift} {space}'
                ],
                'sigma-shift-no': [
                    'A Z E R T Y',
                    'U I O P Q S',
                    'D F G H J K ',
                    'L M W X C V',
                    ' B N , . ;',
                    '{bksp} {lock} {shift} {space}'
                ]
            },
            display: {
                '{bksp}': 'Effacer',
                '{enter}': 'Valider',
                '{space}': 'Espace',
                '{shift}': 'Maj.',
                '{lock}': 'VERR.',
            },
            useButtonTag: false,
            buttonTheme: [
                {
                    class: 'btn btn-danger',
                    buttons: '{bksp}'
                },
                {
                    class: 'btn btn-success',
                    buttons: '{enter}'
                },
            ],
            debug: !(environment.production),
            onChange: input => this.onChange(input),
            onKeyPress: button => this.onKeyPress(button),
            onKeyReleased: button => this.onKeyReleased(button),
        });
    }

    private initialiserControls()
    {
        this.form = this.formBuilder.group({
            pseudoCtrl: [this.pseudo, Validators.maxLength(10)]
        });
    }

    validerPseudo()
    {
        if (this.form.touched && !this.form.dirty && this.form.valid)
        {
            const image = new Image();
            image._id = this.id;
            image.pseudo = this.pseudo;
            this.imagesService.genererSVG(image).pipe(
                tap(() => this.router.navigate(['visualisation/impression-photo']))
            ).subscribe();
        }
    }

    onChange = (input: string) =>
    {
        this.form.controls.pseudoCtrl.markAsTouched();
        this.pseudo = input;
        this.form.controls.pseudoCtrl.setValue(input);
    }

    onKeyReleased = (button: string) =>
    {
        if (!this.form.touched || this.form.dirty || this.form.invalid)
        {
            const currentLayout = this.keyboard.options.layoutName;
            const shiftToggle = currentLayout === 'sigma-shift' || currentLayout === 'sigma-shift-no' ? 'sigma-shift-no' : 'sigma-no';
            this.keyboard.setOptions({
                layoutName: shiftToggle
            });
        }
        else
        {
            const currentLayout = this.keyboard.options.layoutName;
            const shiftToggle = currentLayout === 'sigma-shift' || currentLayout === 'sigma-shift-no' ? 'sigma-shift' : 'sigma';
            this.keyboard.setOptions({
                layoutName: shiftToggle
            });
        }
    }

    onKeyPress = (button: string) =>
    {
        /*
         * If you want to handle the shift and caps lock buttons
         */
        if (button === '{shift}' || button === '{lock}')
        {
            this.lockActivated = button === '{lock}';
            this.handleShift();
        }
        /*
         * Simulation du bouton
         */
        else if (button === '{enter}')
        {
            this.validerPseudo();
        }
        else
        {
            const currentLayout = this.keyboard.options.layoutName;
            if (!this.lockActivated && (currentLayout === 'sigma-shift' || currentLayout === 'sigma-shift-no'))
            {
                this.handleShiftReverse();
            }
        }
    }

    handleShift = () =>
    {
        const currentLayout = this.keyboard.options.layoutName;
        let shiftToggle = currentLayout === 'sigma' ? 'sigma-shift' : 'sigma';
        if (currentLayout === 'sigma-no')
        {
            shiftToggle = 'sigma-shift-no';
        }
        else if (currentLayout === 'sigma-shift-no')
        {
            shiftToggle = 'sigma-no';
        }

        this.keyboard.setOptions({
            layoutName: shiftToggle
        });
    }

    handleShiftReverse = () =>
    {
        const currentLayout = this.keyboard.options.layoutName;
        let shiftToggle = currentLayout === 'sigma-shift' ? 'sigma' : 'sigma-shift';
        if (currentLayout === 'sigma-shift-no')
        {
            shiftToggle = 'sigma-no';
        }
        else if (currentLayout === 'sigma-no')
        {
            shiftToggle = 'sigma-shift-no';
        }

        this.keyboard.setOptions({
            layoutName: shiftToggle
        });
    }
}
