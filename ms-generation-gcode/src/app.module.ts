import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ProcessService } from './process/process.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IMPRESSION_GCODE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'integration-robots',
          queueOptions: {
            durable: true,
          }
        }
      }
    ])],
  controllers: [AppController],
  providers: [ ProcessService]
})
export class AppModule {}
