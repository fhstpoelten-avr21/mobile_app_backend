import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to my first FH St.Poelten Mobile Project';
  }
}
