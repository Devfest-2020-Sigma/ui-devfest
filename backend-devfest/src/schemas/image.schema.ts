import { Schema, model } from 'mongoose';
import { IImage } from '../images/image.interface';


export const ImageSchema = new Schema({
  pseudo: String,
  imageSelectionnee: Number,
  etat: String
});

export const imageModel = model<IImage>('Image', ImageSchema);