import { Transport } from '@nestjs/microservices';
import { TransportType } from 'nestjs-transport-eventbus';
import { RobotRabbit } from './robot.rabbit';

@TransportType(Transport.RMQ)
export class RobotRabbitEvent {
  constructor(
    readonly message: RobotRabbit
  ) {
  }
}
