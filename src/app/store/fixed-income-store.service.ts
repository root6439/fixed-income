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

  private getFilteredList(filter: string) {
    filter = filter.toLowerCase();

    const filteredList = this._originalState.filter(
      (value) =>
        String(value.id).toLowerCase().includes(filter) ||
        value.descricao.toLowerCase().includes(filter) ||
        value.indexador.nome.toLowerCase().includes(filter) ||
        value.tipoProduto.nome.toLowerCase().includes(filter)
    );

    this.setState(filteredList);
  }

  getList(filter?: string) {
    if (filter) {
      this.getFilteredList(filter);
      return;
    }

    if (!filter && this._originalState.length > 0) {
      this.setState(this._originalState);
      return;
    }

    this._service.getList().subscribe({
      next: (value) => {
        this._originalState = value;
        this.setState(value);
      },
    });
  }

  getById(id: number) {
    if (this._originalState.length > 0) {
      return of(this._originalState.find((value) => value.id == id));
    }

    return this._service.getById(id);
  }

  // A API não está retornando o novo objeto cadastrado no DB, infelizmente vou ter que puxar uma lista atualizada do servidor
  // ao invés de apenas inserir o novo item ao state
  create(fixedIncome: FixedIncomePostRequest) {
    this._service.post(fixedIncome).subscribe({
      next: () => {
        this._originalState = [];
        this.getList();
      },
    });
  }

  // endpoint não retorna o objeto atualizado, necessário fazer um request pra pegar uma lista atualizada
  update(fixedIncome: FixedIncomePutRequest) {
    this._service.put(fixedIncome).subscribe({
      next: () => {
        this._originalState = [];
        this.getList();
      },
    });
  }

  delete(id: number) {
    this._service.delete(id).subscribe({
      next: () => {
        const newState = this._originalState.filter((value) => value.id != id);
        this._originalState = newState;
        this.setState(newState);
      },
    });
  }
}
