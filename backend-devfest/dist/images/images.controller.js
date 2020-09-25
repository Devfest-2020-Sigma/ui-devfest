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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const configuration_enum_1 = require("../common/configuration.enum");
const process_enum_1 = require("../process/process.enum");
const process_service_1 = require("../process/process.service");
const image_dto_1 = require("./image.dto");
const image_etat_enum_1 = require("./image.etat.enum");
const images_service_1 = require("./images.service");
let ImagesController = class ImagesController {
    constructor(imagesService, processService) {
        this.imagesService = imagesService;
        this.processService = processService;
    }
    initialiserWorkflow() {
        return this.imagesService.initialiserWorkflow().then(async (image) => {
            let imageDto = new image_dto_1.ImageDto();
            console.log('arret du streaming');
            await this.processService.execCommand(process_enum_1.processEnum.STREAMING_STOP);
            imageDto.etat = image_etat_enum_1.ImageEtatEnum.PRISE_PHOTO_EN_COURS;
            this.imagesService.editImage(image._id, imageDto, function () { });
            const path = configuration_enum_1.ConfigurationEnum.IMPRESSION_REPERTOIRE + image._id;
            await this.processService.execCommand(process_enum_1.processEnum.CAPTURE_IMAGES, path);
            imageDto.etat = image_etat_enum_1.ImageEtatEnum.PRISE_PHOTO_EFFECTUEE;
            this.imagesService.editImage(image._id, imageDto, function () { });
            return image;
        });
    }
    async recupererImagesSVG(id, res) {
        const path = configuration_enum_1.ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop';
        res.sendFile('jpg2lite-front.svg', { root: path });
    }
    async recupererImagesMosaic(id, res) {
        return res.sendFile('mosaic.jpg', { root: configuration_enum_1.ConfigurationEnum.IMPRESSION_REPERTOIRE + id });
    }
    streamingstart() {
        console.log('Debut du streaming');
        this.processService.execCommand(process_enum_1.processEnum.STREAMING_START).catch(error => { console.log('caught', error.message); });
    }
    async getImage(id) {
        return this.imagesService.getImage(id);
    }
    async imprimerGcode(id) {
        const path = configuration_enum_1.ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop/jpg2lite';
        await this.processService.execCommand(process_enum_1.processEnum.SENDSVG2GCODE, path).catch(error => { console.log('caught', error.message); });
        ;
    }
    async miseAjoutPseudo(image) {
        const path = configuration_enum_1.ConfigurationEnum.IMPRESSION_REPERTOIRE + image._id + '/crop';
        await this.processService.execCommand(process_enum_1.processEnum.JPG2LITE, path, image.imageSelectionnee, '"' + image.pseudo + '"').catch(error => { console.log('caught', error.message); });
    }
};
__decorate([
    common_1.Get('/initialiser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "initialiserWorkflow", null);
__decorate([
    common_1.Get('/getsvg/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "recupererImagesSVG", null);
__decorate([
    common_1.Get('/getmosaic/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "recupererImagesMosaic", null);
__decorate([
    common_1.Get('/streaming'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "streamingstart", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
__decorate([
    common_1.Get('/imprimer/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "imprimerGcode", null);
__decorate([
    common_1.Put('/pseudo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [image_dto_1.ImageDto]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "miseAjoutPseudo", null);
ImagesController = __decorate([
    common_1.Controller('api/images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService,
        process_service_1.ProcessService])
], ImagesController);
exports.ImagesController = ImagesController;
//# sourceMappingURL=images.controller.js.map