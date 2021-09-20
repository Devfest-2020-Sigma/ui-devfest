import {model, Schema} from 'mongoose';
import {IImage} from '../images/image.interface';


export const ImageSchema = new Schema({
  pseudo: String,
  imageSelectionnee: Number,
  etat: String,
  renduSelectionne: String,
  renduJpegLite: Boolean,
  renduJpegTsp: Boolean,
  renduJpegSquiggle: Boolean,
  renduJpegMst: Boolean,
  renduJpegSkip: Boolean,
  renduJpegHilbert: Boolean
});

export const imageModel = model<IImage>('Image', ImageSchema);