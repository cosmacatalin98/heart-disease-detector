import { TestBed } from '@angular/core/testing';

import { AccuracyService } from './accuracy.service';

describe('AccuracyService', () => {
  let service: AccuracyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccuracyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
