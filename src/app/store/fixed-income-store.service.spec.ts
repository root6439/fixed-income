import { TestBed } from '@angular/core/testing';

import { FixedIncomeStoreService } from './fixed-income-store.service';

describe('FixedIncomeStoreService', () => {
  let service: FixedIncomeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedIncomeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
