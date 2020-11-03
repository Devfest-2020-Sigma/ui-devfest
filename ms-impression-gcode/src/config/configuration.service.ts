import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get env(): string {
        return this.configService.get<string>('app.env');
    }
    get rabbit_host(): string {
        return this.configService.get<string>('app.rabbit_host');
    }
    get rabbit_port(): number {
        return Number(this.configService.get<number>('app.rabbit_port'));
    }
    get rabbit_login(): string {
        return this.configService.get<string>('app.rabbit_login');
    }
    get rabbit_password(): string {
        return this.configService.get<string>('app.rabbit_password');
    }
    get impression_repertoire(): string {
        return this.configService.get<string>('app.impression_repertoire');
    }
    get repertoire_scripts(): string {
        return this.configService.get<string>('app.repertoire_scripts');
    }
}