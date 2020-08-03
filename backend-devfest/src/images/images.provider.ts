import {Connection} from 'mongoose';
import {ImageSchema} from '../schemas/image.schema';

export const imagesProviders = [
  {
    provide: 'IMAGE_MODEL',
    useFactory: (connection: Connection) => connection.model('Image', ImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
