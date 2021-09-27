import {Component, OnInit} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {RobotsService} from 'src/app/core/service/robots.service';
import {Robot} from 'src/app/core/model/robot.model';
import {RobotEtatEnum} from 'src/app/core/model/robot.etat.enum';


@Component({
    selector: 'app-suivi-robots',
    templateUrl: './liste-robots.component.html'
})
export class ListeRobotsComponent implements OnInit
{
    rows: Robot[] = [];
    reorderable = true;

    columns = [{name: 'Ip du robot'}, {name: 'Statut'}, {name: 'Durée'}, {name: 'Actions', sortable: false}];

    ColumnMode = ColumnMode;

    constructor(private robotsService: RobotsService)
    {
    }

    ngOnInit(): void
    {
        this.robotsService.recupererListeRobots().subscribe(robots =>
        {
            this.rows = robots;
            robots.forEach(robot =>
            {
                this.recupererEtat(robot);
            });
        });
        setTimeout(
            () =>
            {
                location.reload();
            }, 60000);
    }


    annulerImpression(robot: Robot): void
    {
        this.robotsService.annulerImpressionRobot(robot).subscribe(() =>
        {
            this.recupererEtat(robot);
        });
    }

    pauseImpression(robot: Robot): void
    {
        this.robotsService.mettreSurPauseRobot(robot).subscribe(() =>
        {
            this.recupererEtat(robot);
        });
    }

    reScheduleImpression(robot: Robot): void
    {
        this.robotsService.rejouerImpressionRobot(robot).subscribe(() =>
        {
            this.recupererEtat(robot);
        });
    }

    returnToZero(robot: Robot): void
    {
        this.robotsService.returnToZero(robot).subscribe(() =>
        {
            this.recupererEtat(robot);
        });
    }

    resetToZero(robot: Robot): void
    {
        this.robotsService.resetToZero(robot).subscribe(() =>
        {
            this.recupererEtat(robot);
        });
    }

    recupererEtat(robot: Robot): void
    {
        this.robotsService.recupererEtatRobot(robot).subscribe(etat =>
        {
            this.rows.forEach(row =>
            {
                if (row.ip === robot.ip && etat)
                {
                    row.etat = RobotEtatEnum[etat.state];
                    const duration = Number(etat.sendRemainingDuration) / 60000;
                    row.duree = duration;
                }
            });
            /*const finalRow = this.rows.find(row => row.ip === robot.ip);
            if (etat)
            {
                finalRow.etat = RobotEtatEnum[etat.state];
            }*/
        });
    }

    calculateDuration(row: any, value: string)
    {
        if (RobotEtatEnum[row.etat] === RobotEtatEnum.RUN)
        {
            return value + 'min. restante(s)';
        }
        return '';
    }
}
