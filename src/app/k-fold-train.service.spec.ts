import { TestBed } from '@angular/core/testing';

import { KFoldTrainService } from './k-fold-train.service';

describe('KFoldTrainService', () => {
  let service: KFoldTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KFoldTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
