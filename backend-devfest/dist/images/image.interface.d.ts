import { Document } from 'mongoose';
import { ImageEtatEnum } from './image.etat.enum';
export interface IImage extends Document {
    _id: string;
    pseudo: string;
    imageSelectionnee: number;
    etat: ImageEtatEnum;
    tailleCalculee: number;
    renduJpegLite: boolean;
    renduJpegTsp: boolean;
    renduJpegSquiddle: boolean;
}
