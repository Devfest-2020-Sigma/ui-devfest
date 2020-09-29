import { model, Schema } from 'mongoose';
import { IRobot } from '../robots/robot.interface';


export const RobotSchema = new Schema({
  ip: String
});

export const robotModel = model<IRobot>('Robot', RobotSchema);