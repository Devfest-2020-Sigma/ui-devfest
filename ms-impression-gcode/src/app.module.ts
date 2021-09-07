import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProcessService} from './process/process.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'INTEGRATION_ROBOT', transport: Transport.RMQ,
        options: {
          urls: ['amqp://' + process.env.RABBIT_USER + ':' + process.env.RABBIT_PWD + '@' + process.env.RABBIT_HOST + ':' + process.env.RABBIT_PORT],
          queue: process.env.RABBIT_QUEUE,
          queueOptions: {
            durable: true,
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, ProcessService],
})
export class AppModule { }
