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
exports.RabbitPublisher = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const nestjs_transport_eventbus_1 = require("nestjs-transport-eventbus");
let RabbitPublisher = class RabbitPublisher {
};
__decorate([
    microservices_1.Client({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://admin:admin@localhost:5672'],
            queue: 'impression-robots',
            queueOptions: {
                durable: true,
            },
        },
    }),
    __metadata("design:type", microservices_1.ClientProxy)
], RabbitPublisher.prototype, "client", void 0);
RabbitPublisher = __decorate([
    common_1.Injectable(),
    nestjs_transport_eventbus_1.Publisher(microservices_1.Transport.RMQ)
], RabbitPublisher);
exports.RabbitPublisher = RabbitPublisher;
//# sourceMappingURL=rabbit.publisher.js.map