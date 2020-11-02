import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Then combine it with a RabbitMQ microservice
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'integration-robots',
      queueOptions: {
        durable: true,
      },
    }
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
