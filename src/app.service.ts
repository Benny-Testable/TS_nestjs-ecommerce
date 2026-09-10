import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // Dummy, dummy.
    return 'Hello World!';
  }
}
