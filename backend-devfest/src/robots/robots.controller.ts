import { Controller, Get } from '@nestjs/common';
import { RobotsEnum } from './robots.enum';
import { RobotDto } from './robot.dto';

@Controller('api/robots')
export class RobotsController {

  constructor(
  ) { }

  @Get()
  recupererListeRobots() {
    const robots = [];
    Object.keys(RobotsEnum).forEach( key => {
      let robot = new RobotDto();
      robot.nom = key;
      robot.ip = RobotsEnum[key];
      robots.push(robot);
    });
    return robots;
  }

}