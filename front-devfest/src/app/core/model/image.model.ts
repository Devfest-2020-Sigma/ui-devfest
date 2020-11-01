import { ImageRenduEnum } from './image.rendu.enum';

export class Image {
  public _id? : string;
  public pseudo?: string;
  public imageSelectionnee?: number;
  public renduSelectionne?: ImageRenduEnum;
  public etat?: string;   
  public renduJpegLite? : boolean;
  public renduJpegTsp? : boolean;
  public renduJpegSquiddle? : boolean;
}
