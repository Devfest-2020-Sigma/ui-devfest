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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rabbit_event_1 = require("../events/rabbit.event");
const image_schema_1 = require("../schemas/image.schema");
const image_etat_enum_1 = require("./image.etat.enum");
const image_rabbit_1 = require("./image.rabbit");
const image_rendu_enum_1 = require("./image.rendu.enum");
let ImagesService = class ImagesService {
    constructor(clientGenerationGCode, clientImpressionGCode) {
        this.clientGenerationGCode = clientGenerationGCode;
        this.clientImpressionGCode = clientImpressionGCode;
    }
    async initialiserWorkflow() {
        const image = new image_schema_1.imageModel({
            pseudo: "",
            imageSelectionnee: "",
            etat: image_etat_enum_1.ImageEtatEnum.DEBUT_WORKFLOW,
            renduJpegLite: false,
            renduJpegTsp: false,
            renduJpegSquiddle: false
        });
        return image.save();
    }
    sendGenerationGcodeRabbitEvent(id) {
        let imageRabbit = new image_rabbit_1.ImageRabbit;
        imageRabbit.id = id;
        Object.keys(image_rendu_enum_1.ImageRenduEnum).forEach(key => {
            this.clientGenerationGCode.emit(image_rendu_enum_1.ImageRenduEnum[key], (new rabbit_event_1.RabbitEvent(imageRabbit)));
        });
    }
    sendImpressionGcodeRabbitEvent(id) {
        let imageRabbit = new image_rabbit_1.ImageRabbit;
        imageRabbit.id = id;
        this.clientImpressionGCode.emit('impression-gcode', (new rabbit_event_1.RabbitEvent(imageRabbit)));
    }
};
ImagesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('GENERATION_GCODE')),
    __param(1, common_1.Inject('IMPRESSION_GCODE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map