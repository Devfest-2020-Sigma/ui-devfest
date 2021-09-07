import {Module} from '@nestjs/common';
import {ImagesController} from './images.controller';
import {ImagesService} from './images.service';
import {ProcessService} from 'src/process/process.service';
import {imagesProviders} from './images.provider';
import {DatabaseModule} from 'src/database/database.module';
import {ClientsModule} from '@nestjs/microservices/module/clients.module';
import {Transport} from '@nestjs/microservices/enums/transport.enum';
import {ImageDao} from 'src/images/image.dao';


@Module({
  imports: [DatabaseModule,
    ClientsModule.register([
      {
        name: 'GENERATION_GCODE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://' + process.env.RABBIT_USER + ':' + process.env.RABBIT_PWD + '@' + process.env.RABBIT_HOST + ':' + process.env.RABBIT_PORT],
          queue: process.env.RABBIT_QUEUE_GENERATION,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'IMPRESSION_GCODE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://' + process.env.RABBIT_USER + ':' + process.env.RABBIT_PWD + '@' + process.env.RABBIT_HOST + ':' + process.env.RABBIT_PORT],
          queue: process.env.RABBIT_QUEUE_IMPRESSION,
          queueOptions: {
            durable: true,
          },
        },
      }
    ])],
  controllers: [ImagesController],
  providers: [ImagesService, ProcessService, ImageDao,...imagesProviders]
})
export class ImagesModule {}
