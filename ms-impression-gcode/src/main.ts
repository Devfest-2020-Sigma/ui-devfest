import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'impression-gcode',
      queueOptions: {
        durable: true
      },
    },
  });
  await app.listen(() => {
    console.log('Microservice is listening')
    const appService = app.get(AppService);
    appService.declarationRobot();
  });
}
bootstrap();
