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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const image_schema_1 = require("../schemas/image.schema");
const image_etat_enum_1 = require("./image.etat.enum");
let ImagesService = class ImagesService {
    constructor() {
    }
    async editImage(imageId, createImageDTO, callback) {
        delete createImageDTO._id;
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
};
ImagesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map