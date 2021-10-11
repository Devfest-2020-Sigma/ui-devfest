import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {slideInUpOnEnterAnimation} from 'angular-animations';
import {ImagesService} from '@service/images.service';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    animations: [
        slideInUpOnEnterAnimation()
    ]
})
export class AccueilComponent implements OnInit, OnDestroy
{

    constructor(
        private imagesService: ImagesService,
        private router: Router)
    {
    }

    ngOnInit(): void
    {
        this.imagesService.arreterStreaming().subscribe();
    }

    onCommencer(): void
    {
        this.router.navigate(['visualisation/rgpd']);
    }

    ngOnDestroy(): void
    {
        // Rien
    }
}
