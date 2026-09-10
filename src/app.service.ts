import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // Dummy change to trigger another push.
    return 'Hello World!';
  }
}
