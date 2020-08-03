import { Document } from 'mongoose';

export interface IImage extends Document {
   _id : string;
   pseudo: string;
   imageSelectionnee: number;
}
