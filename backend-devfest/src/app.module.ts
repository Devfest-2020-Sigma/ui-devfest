import {Module} from '@nestjs/common';
import {ImagesModule} from './images/images.module';
import {RobotsModule} from './robots/robots.module';
import {ConfigModule} from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ImagesModule,
        RobotsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule
{
}
