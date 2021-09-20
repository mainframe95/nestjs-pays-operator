import { Test, TestingModule } from '@nestjs/testing';
import { OperateursService } from './operateurs.service';

describe('OperateursService', () => {
  let service: OperateursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperateursService],
    }).compile();

    service = module.get<OperateursService>(OperateursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
