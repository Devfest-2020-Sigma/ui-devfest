import {Controller, Get} from '@nestjs/common';
import {Param} from '@nestjs/common/decorators/http/route-params.decorator';
import {EventPattern} from '@nestjs/microservices';
import {processEnum} from 'src/process/process.enum';
import {ProcessService} from 'src/process/process.service';
import {RobotCommandEnum} from './robot.command.enum';
import {IRobot} from './robot.interface';
import {RobotRabbit} from './robot.rabbit';
import {RobotsService} from './robots.service';

@Controller('api/robots')
export class RobotsController
{

  constructor(
      private readonly processService: ProcessService,
      private readonly robotsService: RobotsService
  )
  {
  }

  @Get()
  async recupererListeRobots(): Promise<IRobot[]> {
    return this.robotsService.recupererListeRobots();
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
  async rejouerImpressionRobot(@Param('ip') ip: string)
  {
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.RESUME.join(" ")).catch(error =>
    {
      console.log('caught', error.message);
    });
  }

  @Get('/statut/:ip')
  async recupererEtatRobot(@Param('ip') ip: string)
  {
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.STATUT.join(" ")).catch(error =>
    {
      console.log('caught', error.message);
    });
  }

  @Get('/returnToZero/:ip')
  async returnToZero(@Param('ip') ip: string)
  {
    return this.processService.execCommand(processEnum.CRAYON_CONTROLLER, ip).catch(error =>
    {
      console.log('caught', error.message);
    });
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.RETURN2ZERO.join(" ")).catch(error =>
    {
      console.log('caught', error.message);
    });
  }

  @Get('/resetToZero/:ip')
  async resetToZero(@Param('ip') ip: string)
  {
    return this.processService.execCommand(processEnum.CRAYON_CONTROLLER, ip).catch(error =>
    {
      console.log('caught', error.message);
    });
    return this.processService.execCommand(processEnum.ROBOT_CONTROLLER, ip, RobotCommandEnum.RESETTOZERO.join(" ")).catch(error =>
    {
      console.log('caught', error.message);
    });
  }

  // Integration des nouveaux robots
  @EventPattern('integration-robot')
  async handleIntegrationRobot(data: Record<string, RobotRabbit>)
  {
    this.robotsService.ajoutNouveauRobot(data.message.ip);
  }
}