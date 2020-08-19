import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../model/robot.model'

const url = 'api/robots';

@Injectable({ providedIn: 'root' })
export class RobotsService {
  constructor(private http: HttpClient) { }

  /**
   * Fonction qui permet de récupérer la liste des robots connectés au portail
   */
  recupererListeRobots() : Observable<any> {
    return this.http.get<any>(`${url}`);
  }

  // Actions 
  stopperRobot(robot : Robot){}

  mettreSurPauseRobot(robot : Robot){}

  rejouerImpressionRobot(robot : Robot){}
}
