import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { ClientProxy } from '@nestjs/microservices';
import * as ip from 'ip';
import { AppConfigService } from './config/configuration.service';
import { RobotRabbit } from './model/robot.rabbit';
import { RobotRabbitEvent } from './model/robot.rabbit.event';

@Injectable()
export class AppService {

    constructor(
      @Inject('INTEGRATION_ROBOT') private readonly clientIntegrationRobot: ClientProxy,
      private configService: AppConfigService
      ) {
      }

    declarationRobot() {
      console.log(this.configService.repertoire_scripts);
      const robot = new RobotRabbit();
      robot.ip = ip.address();
      this.clientIntegrationRobot.emit<any>('integration-robot', new RobotRabbitEvent(robot));
    }
  }