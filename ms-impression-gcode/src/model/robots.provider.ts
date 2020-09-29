import { Connection } from 'mongoose';
import { RobotSchema } from '../schemas/robot.schema';

export const robotsProviders = [
  {
    provide: 'ROBOT_MODEL',
    useFactory: (connection: Connection) => connection.model('Robot', RobotSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
