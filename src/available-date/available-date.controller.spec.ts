import { Test, TestingModule } from '@nestjs/testing';
import { AvailableDateController } from './available-date.controller';

describe('AvailableDateController', () => {
  let controller: AvailableDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableDateController],
    }).compile();

    controller = module.get<AvailableDateController>(AvailableDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
