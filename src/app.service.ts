import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // Dummy push.
    return 'Hello World!';
  }
}
