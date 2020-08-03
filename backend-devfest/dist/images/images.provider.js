"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesProviders = void 0;
const image_schema_1 = require("../schemas/image.schema");
exports.imagesProviders = [
    {
        provide: 'IMAGE_MODEL',
        useFactory: (connection) => connection.model('Image', image_schema_1.ImageSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=images.provider.js.map