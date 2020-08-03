import { TransportType, ExcludeDef } from 'nestjs-transport-eventbus';
import { Transport } from '@nestjs/microservices';
import {ImageDto} from '../images/image.dto';

@TransportType(Transport.RMQ)
export class RabbitEvent {
  constructor(
    readonly message: ImageDto
  ) {
  }
}
