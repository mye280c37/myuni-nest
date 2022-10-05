import { Test, TestingModule } from '@nestjs/testing';
import { AvailableDateService } from './available-date.service';

describe('AvailableDateService', () => {
  let service: AvailableDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableDateService],
    }).compile();

    service = module.get<AvailableDateService>(AvailableDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
