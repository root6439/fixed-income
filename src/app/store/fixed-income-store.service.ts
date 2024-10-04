import { inject, Injectable } from '@angular/core';
import { Store } from './Store';
import { FixedIncome } from '../models/fixed-income.model';
import { FixedIncomeService } from '../services/fixed-income.service';
import {
  FixedIncomePostRequest,
  FixedIncomePutRequest,
} from '../models/fixed-income-request.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FixedIncomeStore extends Store<FixedIncome> {
  private _service = inject(FixedIncomeService);

  constructor() {
    super([]);
  }

  getList(id?: number) {
    if (this.state.length > 0) {
      return;
    }

    this._service.getList().subscribe({
      next: (value) => this.setState(value),
    });
  }

  getById(id: number) {
    if (this.state.length > 0) {
      return of(this.state.find((value) => value.id == id));
    }

    return this._service.getById(id);
  }

  create(fixedIncome: FixedIncomePostRequest) {
    this._service.post(fixedIncome).subscribe({
      next: (newValue) => this.setState([...this.state, newValue]),
    });
  }

  update(fixedIncome: FixedIncomePutRequest) {
    this._service.put(fixedIncome).subscribe({
      next: (updateValue) => {
        const newState = this.state.map((value) =>
          value.id == fixedIncome.id ? { ...value, ...updateValue } : value
        );

        this.setState(newState);
      },
    });
  }

  delete(id: number) {
    this._service.delete(id).subscribe({
      next: () => {
        const newState = this.state.filter((value) => value.id != id);
        this.setState(newState);
      },
    });
  }
}
