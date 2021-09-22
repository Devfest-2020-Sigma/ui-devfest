import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-annulation-workflow',
    templateUrl: './annulation-workflow.component.html',
    styleUrls: ['./annulation-workflow.component.scss']
})
export class AnnulationWorkflowComponent implements OnInit
{
    constructor(private router: Router)
    {
    }

    ngOnInit(): void
    {
    }

    public onAnnuler(): void
    {
        // on retourne à l'accueil
        this.router.navigate(['']);
    }
}
