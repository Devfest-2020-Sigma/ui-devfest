import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport, Client} from '@nestjs/microservices';
import { Publisher } from 'nestjs-transport-eventbus';

@Injectable()
@Publisher(Transport.RMQ)
export class RabbitPublisher {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'impression-robots',
      queueOptions: {
        durable: true,
      },
    },
  })
  client: ClientProxy;
}
