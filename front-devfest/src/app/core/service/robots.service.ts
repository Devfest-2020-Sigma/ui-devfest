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
    const url_annuler = 'api/v1/files/cancel';
    return this.http.get<any>(`${url_annuler}`);
  }

  mettreSurPauseRobot(robot : Robot){
    const url_etat = 'api/v1/files/pause';
    return this.http.get<any>(`${url_etat}`);
  }

  rejouerImpressionRobot(robot : Robot){}

  // Permet de récupérer l'état d'un robot
  recupererEtatRobot(robot :Robot){
    //const url_etat = 'http://' + robot.ip + ':8080/api/v1/status/getStatus';
    const url_etat = 'api/v1/status/getStatus';
    return this.http.get<any>(`${url_etat}`);
  }
}
