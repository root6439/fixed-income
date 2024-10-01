import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFixedIncomeComponent } from './list-fixed-income.component';

describe('ListFixedIncomeComponent', () => {
  let component: ListFixedIncomeComponent;
  let fixture: ComponentFixture<ListFixedIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFixedIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFixedIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
