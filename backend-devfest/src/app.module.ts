import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ImagesModule} from './images/images.module'
import { TransportEventBusModule } from 'nestjs-transport-eventbus';
import { RabbitPublisher } from './publisher/rabbit.publisher';

@Module({
  imports:  [ImagesModule,
    TransportEventBusModule.forRoot({
      publishers: [RabbitPublisher]
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
