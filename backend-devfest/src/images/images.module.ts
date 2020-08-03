import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ProcessService } from 'src/process/process.service';
import { imagesProviders } from './images.provider';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService, ProcessService,...imagesProviders]
})
export class ImagesModule {}
