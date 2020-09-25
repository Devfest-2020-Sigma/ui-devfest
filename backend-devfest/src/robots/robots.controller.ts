import { Controller, Get } from '@nestjs/common';
import { RobotsEnum } from './robots.enum';
import { RobotDto } from './robot.dto';
import { ProcessService } from 'src/process/process.service';
import { processEnum } from 'src/process/process.enum';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { RobotCommandEnum } from './robot.command.enum';

@Controller('api/robots')
export class RobotsController {

  constructor(
    private readonly processService: ProcessService
  ) { }

  @Get()
  recupererListeRobots() {
    const robots = [];
    Object.keys(RobotsEnum).forEach(key => {
      let robot = new RobotDto();
      robot.nom = key;
      robot.ip = RobotsEnum[key];
      robots.push(robot);
    });
    return robots;
  }

  @Get('/annuler/:ip')
  async annulerImpressionRobot(@Param('ip') ip: string) {
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.ANNULER.join(" ")).catch(error => { console.log('caught', error.message); });
  }

  @Get('/pause/:ip')
  async mettreSurPauseRobot(@Param('ip') ip: string) {
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.PAUSE.join(" ")).catch(error => { console.log('caught', error.message); });
  }

  @Get('/rejouer/:ip')
  async rejouerImpressionRobot(@Param('ip') ip: string) {
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.RESUME.join(" ")).catch(error => { console.log('caught', error.message); });
  }

  @Get('/statut/:ip')
  async recupererEtatRobot(@Param('ip') ip: string) {
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.STATUT.join(" ")).catch(error => { console.log('caught', error.message); });
  }
}