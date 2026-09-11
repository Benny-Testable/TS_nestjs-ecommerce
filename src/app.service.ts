import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // Dummy change.
    return 'Hello World!';
  }
}
