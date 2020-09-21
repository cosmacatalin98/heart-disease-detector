import { TestBed } from '@angular/core/testing';

import { ModelParametersService } from './model-parameters.service';

describe('ModelParametersService', () => {
  let service: ModelParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
