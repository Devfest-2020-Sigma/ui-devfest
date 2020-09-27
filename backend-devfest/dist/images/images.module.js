"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesModule = void 0;
const common_1 = require("@nestjs/common");
const images_controller_1 = require("./images.controller");
const images_service_1 = require("./images.service");
const process_service_1 = require("../process/process.service");
const images_provider_1 = require("./images.provider");
const database_module_1 = require("../database/database.module");
const clients_module_1 = require("@nestjs/microservices/module/clients.module");
const transport_enum_1 = require("@nestjs/microservices/enums/transport.enum");
const database_service_1 = require("../database/database.service");
let ImagesModule = class ImagesModule {
};
ImagesModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule,
            clients_module_1.ClientsModule.register([
                {
                    name: 'GENERATION_GCODE', transport: transport_enum_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://admin:admin@localhost:5672'],
                        queue: 'generation-gcode',
                        queueOptions: {
                            durable: true,
                        },
                    },
                },
                {
                    name: 'IMPRESSION_GCODE', transport: transport_enum_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://admin:admin@localhost:5672'],
                        queue: 'impression-gcode',
                        queueOptions: {
                            durable: true,
                        },
                    },
                }
            ])],
        controllers: [images_controller_1.ImagesController],
        providers: [images_service_1.ImagesService, process_service_1.ProcessService, database_service_1.DatabaseService, ...images_provider_1.imagesProviders]
    })
], ImagesModule);
exports.ImagesModule = ImagesModule;
//# sourceMappingURL=images.module.js.map