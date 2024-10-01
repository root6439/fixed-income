import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFixedIncomeComponent } from './create-fixed-income.component';

describe('CreateFixedIncomeComponent', () => {
  let component: CreateFixedIncomeComponent;
  let fixture: ComponentFixture<CreateFixedIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFixedIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFixedIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
