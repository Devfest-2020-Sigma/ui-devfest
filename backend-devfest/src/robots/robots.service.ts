import { Injectable } from '@nestjs/common';
import { RobotDao } from './robot.dao';
import { IRobot } from './robot.interface';

@Injectable()
export class RobotsService {

  constructor(
    private readonly robotDao: RobotDao
  ) {
  }

  /**
   * Retourne la liste de l'ensemble des robots présents
   */
  async recupererListeRobots(): Promise<IRobot[]> {
    return this.robotDao.getRobots();
  }


  async ajoutNouveauRobot(ip: string) {
    this.robotDao.findRobot({ 'ip': ip }).then(async robot => {
      if (robot === null) {
        console.log("Ajout nouveau robot ", ip);
        this.robotDao.ajoutRobot(ip);
      } else {
        console.log("Robot déjà présent, id :", robot._id);
      }
    });
  }
}
