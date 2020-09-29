import { Injectable } from '@nestjs/common';
import * as ip from 'ip';
import { robotModel } from './schemas/robot.schema';

@Injectable()
export class AppService {

    constructor(
      ) {
      }

    declarationRobot() {
      const robot = new robotModel({
        ip: ip.address()
      });
      return robot.save();
    }
  }