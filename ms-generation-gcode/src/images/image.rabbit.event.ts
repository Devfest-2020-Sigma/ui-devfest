import { Transport } from '@nestjs/microservices';
import { TransportType } from 'nestjs-transport-eventbus/dist/decorators/transport.type.event-bus.decorator';
import { ImageRabbit } from './image.rabbit';

@TransportType(Transport.RMQ)
export class ImageRabbitEvent {
  constructor(
    readonly message: ImageRabbit
  ) {
  }
}
