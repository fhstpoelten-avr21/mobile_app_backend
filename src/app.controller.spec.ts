import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Welcome to my first FH St.Poelten Mobile Project"', () => {
      expect(appController.getHello()).toBe(
        'Welcome to my first FH St.Poelten Mobile Project',
      );
    });
  });
});
