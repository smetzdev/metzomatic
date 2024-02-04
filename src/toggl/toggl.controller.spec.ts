import { Test, TestingModule } from '@nestjs/testing';
import { TogglController } from './toggl.controller';
import { TogglService } from './toggl.service';

describe('TogglController', () => {
  let controller: TogglController;
  let service: TogglService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TogglController],
      providers: [
        {
          provide: TogglService,
          useValue: {
            getLastMonthReport: jest.fn(),
            getCurrentMonthReport: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TogglController>(TogglController);
    service = module.get<TogglService>(TogglService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLastMonthReport', () => {
    it('should call the getLastMonthReport method of TogglService and return the result', async () => {
      // Arrange
      const clientId = 123;

      // Act
      await controller.getLastMonthReport(clientId);

      // Assert
      expect(service.getLastMonthReport).toHaveBeenCalledWith(+clientId);
    });
  });

  describe('getCurrentMonthReport', () => {
    it('should call the getCurrentMonthReport method of TogglService and return the result', async () => {
      // Arrange
      const clientId = 123;

      // Act
      await controller.getCurrentMonthReport(clientId);

      // Assert
      expect(service.getCurrentMonthReport).toHaveBeenCalledWith(+clientId);
    });
  });
});
