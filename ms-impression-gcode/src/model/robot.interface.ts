import { Document } from 'mongoose';

export interface IRobot extends Document {
   _id : string;
   ip : string;
}
