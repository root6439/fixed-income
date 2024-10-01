import { TestBed } from '@angular/core/testing';

import { FixedIncomeService } from './fixed-income.service';

describe('FixedIncomeService', () => {
  let service: FixedIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedIncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
