import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { RobotsModule } from './robots/robots.module';


@Module({
  imports: [ImagesModule,
    RobotsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
