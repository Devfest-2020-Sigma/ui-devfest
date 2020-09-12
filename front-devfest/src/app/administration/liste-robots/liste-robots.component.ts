import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RobotsService } from 'src/app/core/service/robots.service';
import { Robot } from 'src/app/core/model/robot.model';
import { RobotEtatEnum } from 'src/app/core/model/robot.etat.enum';


@Component({
  selector: 'app-suivi-robots',
  templateUrl: './liste-robots.component.html'
})
export class ListeRobotsComponent implements OnInit {
  rows : Robot[] = [] ;
  reorderable = true;

  columns = [{ name: 'Nom du Robot' }, { name: 'Ip du robot' }, { name: 'Statut' }, {name : 'Actions' , sortable: false}];

  ColumnMode = ColumnMode;

  constructor(private robotsService : RobotsService) { }

  ngOnInit(): void {
    this.robotsService.recupererListeRobots().subscribe(robots => {
      this.rows = robots;
      robots.forEach(robot => {
        this.robotsService.recupererEtatRobot(robot).subscribe(etat =>{
          let row = this.rows.find(row => row.ip === robot.ip);
          row.etat = RobotEtatEnum[etat.state];
        })  
      });
    });
  }


  annulerImpression(robot: Robot): void {
    this.robotsService.annulerImpressionRobot(robot).subscribe(value =>{
        console.log(value);
    });
  }

  pauseImpression(robot: Robot): void {
    this.robotsService.mettreSurPauseRobot(robot).subscribe(value =>{
      console.log(value);
  });
  }

  reScheduleImpression(robot: Robot) : void {
   console.log("reschedule");
  }
}
