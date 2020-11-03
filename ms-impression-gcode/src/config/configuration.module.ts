import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './configuration.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'provision')
                    .default('development'),
                RABBIT_HOST: Joi.string().default('localhost'),
                RABBIT_PORT: Joi.number().default(5672),
                RABBIT_LOGIN: Joi.string().default('admin'),
                RABBIT_PASSWORD: Joi.string().default('admin'),
                IMPRESSION_REPERTOIRE: Joi.string().default('/var/devfest/impressions/'),
                REPERTOIRE_SCRIPTS: Joi.string().default('scripts/')
            }),
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule { }
