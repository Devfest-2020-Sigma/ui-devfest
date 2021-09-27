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
          urls: ['amqp://' + 'admin' + ':' + 'admin' + '@' + process.env.RABBIT_HOST + ':' + '5672'],
          queue: 'integration-robots',
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
