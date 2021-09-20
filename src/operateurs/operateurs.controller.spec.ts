import { Test, TestingModule } from '@nestjs/testing';
import { OperateursController } from './operateurs.controller';

describe('OperateursController', () => {
  let controller: OperateursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperateursController],
    }).compile();

    controller = module.get<OperateursController>(OperateursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
