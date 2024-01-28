import { Test, TestingModule } from '@nestjs/testing';
import { TogglService } from './toggl.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('TogglService', () => {
  let service: TogglService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TogglService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TogglService>(TogglService);

    jest.useFakeTimers();
    jest.setSystemTime(new Date('1988-12-03'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo(
    'getCurrentMonthReport should call the TogglAPI with the correct parameters',
  );

  it.todo(
    'getLastMonthReport should call the TogglAPI with the correct parameters',
  );

  afterEach(() => {
    jest.useRealTimers();
  });
});
