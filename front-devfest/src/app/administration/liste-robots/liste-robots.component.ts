import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RobotsService } from 'src/app/core/service/robots.service';


@Component({
  selector: 'app-suivi-robots',
  templateUrl: './liste-robots.component.html'
})
export class ListeRobotsComponent implements OnInit {
  rows = [];
  reorderable = true;

  columns = [{ name: 'Nom du Robot' }, { name: 'Ip du robot' }, { name: 'Statut' }, {name : 'Actions' , sortable: false}];

  ColumnMode = ColumnMode;

  constructor(private robotsService : RobotsService) { }

  ngOnInit(): void {
    this.robotsService.recupererListeRobots().subscribe(value => {
      this.rows = value;
    })
  }
}
