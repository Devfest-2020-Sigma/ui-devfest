import {Document} from 'mongoose';
import {ImageEtatEnum} from './image.etat.enum';
import {ImageRenduEnum} from './image.rendu.enum';

export interface IImage extends Document
{
    _id: string;
    pseudo: string;
    imageSelectionnee: number;
    renduSelectionne: ImageRenduEnum;
    etat: ImageEtatEnum;
    tailleCalculee: number;
    renduJpegLite: boolean;
    renduJpegTsp: boolean;
    renduJpegSquiggle: boolean;
    renduJpegMst: boolean;
    renduJpegSkip: boolean;
    renduJpegHilbert: boolean;
}
