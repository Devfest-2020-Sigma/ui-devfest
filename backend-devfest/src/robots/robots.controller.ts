import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { processEnum } from 'src/process/process.enum';
import { ProcessService } from 'src/process/process.service';
import { RobotCommandEnum } from './robot.command.enum';
import { RobotDao } from './robot.dao';
import { IRobot } from './robot.interface';

@Controller('api/robots')
export class RobotsController {

  constructor(
    private readonly processService: ProcessService,
    private readonly robotDao: RobotDao
  ) { }

  @Get()
  async recupererListeRobots(): Promise<IRobot[]> {
    return this.robotDao.getRobots();
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