import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { ClientProxy } from '@nestjs/microservices';
import * as ip from 'ip';
import { RobotRabbit } from './model/robot.rabbit';
import { RobotRabbitEvent } from './model/robot.rabbit.event';

@Injectable()
export class AppService {

    constructor(
      @Inject('INTEGRATION_ROBOT') private readonly clientIntegrationRobot: ClientProxy
      ) {
      }

    declarationRobot() {
      const robot = new RobotRabbit();
      robot.ip = ip.address();
      this.clientIntegrationRobot.emit<any>('integration-robot', new RobotRabbitEvent(robot));
    }
  }