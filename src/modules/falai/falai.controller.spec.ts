import { Test, TestingModule } from '@nestjs/testing';
import { FalaiController } from './falai.controller';

describe('FalaiController', () => {
  let controller: FalaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FalaiController],
    }).compile();

    controller = module.get<FalaiController>(FalaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
