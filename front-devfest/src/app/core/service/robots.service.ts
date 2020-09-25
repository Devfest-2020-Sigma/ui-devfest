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
  annulerImpressionRobot(robot : Robot){
    return this.http.get<any>(`${url}/annuler/${robot.ip}`);
  }

  mettreSurPauseRobot(robot : Robot){
    return this.http.get<any>(`${url}/pause/${robot.ip}`);
  }

  rejouerImpressionRobot(robot : Robot){
    return this.http.get<any>(`${url}/rejouer/${robot.ip}`);
  }

  // Permet de récupérer l'état d'un robot
  recupererEtatRobot(robot :Robot){
    return this.http.get<any>(`${url}/statut/${robot.ip}`);
  }
}
