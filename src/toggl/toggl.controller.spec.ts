import { Test, TestingModule } from '@nestjs/testing';
import { TogglController } from './toggl.controller';
import { TogglService } from './toggl.service';

describe('TogglController', () => {
  let controller: TogglController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TogglController],
      providers: [
        {
          provide: TogglService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TogglController>(TogglController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
