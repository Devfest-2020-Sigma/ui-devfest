import { Module } from '@nestjs/common';
import { TransportEventBusModule } from 'nestjs-transport-eventbus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module'
import { RobotsModule } from './robots/robots.module'
import { RabbitPublisher } from './publisher/rabbit.publisher';


@Module({
  imports: [ImagesModule,
    RobotsModule,
    TransportEventBusModule.forRoot({
      publishers: [RabbitPublisher]
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
