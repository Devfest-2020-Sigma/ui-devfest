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
                    if (etat.state === 'IDLE' && etat.sendRemainingDuration > 0)
                    {
                        row.etat = RobotEtatEnum.RUN;
                    }

                    const nombreSecondes = Number(etat.sendRemainingDuration) / 1000;
                    if (nombreSecondes > 60)
                    {
                        row.dureeMin = Number((nombreSecondes / 60).toFixed(0));

                        const nbDecimal = (nombreSecondes / 60).toPrecision(3);
                        if (nbDecimal.split('.').length > 1)
                        {
                            // row.dureeSec = Number(nbDecimal.split('.')[1]) * 60 / 100;

                            row.dureeSec = Number((Number(nbDecimal.split('.')[0]) * 60 / 100).toPrecision(2));
                        }
                        else
                        {
                            row.dureeSec = 0;
                        }
                    }
                    else
                    {
                        row.dureeMin = 1;
                        row.dureeSec = 0;
                    }
                }
            });
        });
    }

    calculateDuration(row: any): string
    {
        if (row.etat === RobotEtatEnum.RUN)
        {
            return row.dureeMin + ' min. et ' + row.dureeSec + ' sec. restante(s)';
        }
        return '';
    }
}
