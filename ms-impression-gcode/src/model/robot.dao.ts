import { Injectable } from "@nestjs/common";
import { RobotDto } from "./robot.dto";
import { IRobot } from "./robot.interface";
import { robotModel } from "../schemas/robot.schema";

@Injectable()
export class RobotDao {

     /**
  * Mise à jour des informations liées à l'image avec les nouvelles informations
  * @param robotId id de l'image à mettre à jour
  * @param robotDto Nouveau contenu des données
  */
  async editRobot(robotId, robotDto: RobotDto, callback): Promise<IRobot> {
    delete robotDto._id;
    return robotModel
      .findByIdAndUpdate(robotId, robotDto, callback);
  }

  /**
   * Fonction qui récupère une image en base
   */
  getRobot(robotId): Promise<IRobot> {
    return robotModel.findById(robotId);
  }
}