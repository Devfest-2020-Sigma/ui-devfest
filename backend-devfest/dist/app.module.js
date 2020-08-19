"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_transport_eventbus_1 = require("nestjs-transport-eventbus");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const images_module_1 = require("./images/images.module");
const robots_module_1 = require("./robots/robots.module");
const rabbit_publisher_1 = require("./publisher/rabbit.publisher");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [images_module_1.ImagesModule,
            robots_module_1.RobotsModule,
            nestjs_transport_eventbus_1.TransportEventBusModule.forRoot({
                publishers: [rabbit_publisher_1.RabbitPublisher]
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map