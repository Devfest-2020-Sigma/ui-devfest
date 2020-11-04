"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://admin:admin@localhost:5672'],
            queue: 'integration-robots',
            queueOptions: {
                durable: true,
            },
        }
    });
    await app.startAllMicroservicesAsync();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map