import { TestBed } from '@angular/core/testing';

import { TestTrainService } from './test-train.service';

describe('TestTrainService', () => {
  let service: TestTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
