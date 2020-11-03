import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    env: process.env.APP_ENV,
    rabbit_host: process.env.RABBIT_HOST,
    rabbit_port: process.env.RABBIT_PORT,
    rabbit_login: process.env.RABBIT_LOGIN,
    rabbit_password: process.env.RABBIT_PASSWORD,
    impression_repertoire : process.env.IMPRESSION_REPERTOIRE,
    repertoire_scripts : process.env.REPERTOIRE_SCRIPTS
}));