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
const image_schema_1 = require("../schemas/image.schema");
const image_etat_enum_1 = require("./image.etat.enum");
const nestjs_transport_eventbus_1 = require("nestjs-transport-eventbus");
const rabbit_event_1 = require("../events/rabbit.event");
const image_rabbit_1 = require("./image.rabbit");
let ImagesService = class ImagesService {
    constructor(event) {
        this.event = event;
    }
    async editImage(imageId, createImageDTO, callback) {
        delete createImageDTO._id;
        console.log(createImageDTO);
        console.log(imageId);
        return image_schema_1.imageModel
            .findByIdAndUpdate(imageId, createImageDTO, callback);
    }
    async initialiserWorkflow() {
        const image = new image_schema_1.imageModel({
            pseudo: "",
            imageSelectionnee: "",
            etat: image_etat_enum_1.ImageEtatEnum.DEBUT_WORKFLOW
        });
        return image.save();
    }
    getImage(imageId) {
        return image_schema_1.imageModel.findById(imageId);
    }
    sendRabbitEvent(id) {
        let imageRabbit = new image_rabbit_1.ImageRabbit;
        imageRabbit.id = id;
        this.event.publish(new rabbit_event_1.RabbitEvent(imageRabbit));
    }
};
ImagesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(nestjs_transport_eventbus_1.TRANSPORT_EVENT_BUS_SERVICE)),
    __metadata("design:paramtypes", [Object])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map