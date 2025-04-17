import { Test, TestingModule } from '@nestjs/testing';
import { FalaiService } from './falai.service';

describe('FalaiService', () => {
  let service: FalaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FalaiService],
    }).compile();

    service = module.get<FalaiService>(FalaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
