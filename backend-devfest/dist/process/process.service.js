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
exports.ProcessService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const IMPRESSION_REPERTOIRE = './impressions/';
const REPERTOIRE_SCRIPTS = 'scripts/';
let ProcessService = class ProcessService {
    constructor() {
    }
    execCommand(nomCommande, impressionId) {
        const commande = REPERTOIRE_SCRIPTS + nomCommande + " " + IMPRESSION_REPERTOIRE + impressionId;
        console.log(commande);
        child_process_1.exec(commande, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
    }
};
ProcessService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ProcessService);
exports.ProcessService = ProcessService;
//# sourceMappingURL=process.service.js.map