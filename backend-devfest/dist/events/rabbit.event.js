"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitEvent = void 0;
const nestjs_transport_eventbus_1 = require("nestjs-transport-eventbus");
const microservices_1 = require("@nestjs/microservices");
const image_dto_1 = require("../images/image.dto");
let RabbitEvent = class RabbitEvent {
    constructor(message) {
        this.message = message;
    }
};
RabbitEvent = __decorate([
    nestjs_transport_eventbus_1.TransportType(microservices_1.Transport.RMQ),
    __metadata("design:paramtypes", [image_dto_1.ImageDto])
], RabbitEvent);
exports.RabbitEvent = RabbitEvent;
//# sourceMappingURL=rabbit.event.js.map