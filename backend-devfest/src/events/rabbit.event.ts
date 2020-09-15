import { Transport } from '@nestjs/microservices';
import { TransportType } from 'nestjs-transport-eventbus';
import { ImageRabbit } from 'src/images/image.rabbit';

@TransportType(Transport.RMQ)
export class RabbitEvent {
  constructor(
    readonly message: ImageRabbit
  ) {
  }
}
