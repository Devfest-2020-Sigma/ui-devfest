"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageModel = exports.ImageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ImageSchema = new mongoose_1.Schema({
    pseudo: String,
    imageSelectionnee: Number,
    etat: String
});
exports.imageModel = mongoose_1.model('Image', exports.ImageSchema);
//# sourceMappingURL=image.schema.js.map