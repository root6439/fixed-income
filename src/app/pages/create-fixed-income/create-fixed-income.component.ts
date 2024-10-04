import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ItemInfo } from '../../models/item-info.model';
import { ItemInfoService } from '../../services/item-info.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FixedIncomePostRequest,
  FixedIncomePutRequest,
} from '../../models/fixed-income-request.model';
import { FixedIncomeStore } from '../../store/fixed-income-store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-fixed-income',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    MatAutocompleteModule,
    RouterLink,
  ],
  templateUrl: './create-fixed-income.component.html',
  styleUrl: './create-fixed-income.component.scss',
})
export class CreateFixedIncomeComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _itemInfoService = inject(ItemInfoService);
  private _fixedIncomeStore = inject(FixedIncomeStore);

  fixedIncomeId: number;

  formFixedIncome = this._fb.group({
    description: ['', Validators.required],
    validDate: new FormControl<Date>(null, Validators.required),
    minInvestment: [0, Validators.required],
    productType: [new ItemInfo(), Validators.required],
    indexer: [{ value: new ItemInfo(), disabled: true }, Validators.required],
  });

  productTypes$: Observable<ItemInfo[]>;
  indexers$: Observable<ItemInfo[]>;

  @Input()
  set id(id: string) {
    if (!id) {
      return;
    }

    this.fixedIncomeId = Number(id);
    this._fixedIncomeStore.getById(this.fixedIncomeId).subscribe({
      next: (value) => {
        const mappedValue = {
          description: value.descricao,
          validDate: new Date(value.dataValidade),
          minInvestment: value.investimentoMinimo,
          productType: value.tipoProduto,
          indexer: value.indexador,
        };

        this.formFixedIncome.patchValue(mappedValue);
        this.getIndexers(value.tipoProdutoId);
      },
    });
  }

  ngOnInit(): void {
    this.productTypes$ = this._itemInfoService.getProductTypes();
  }

  getControl(controlName: string) {
    return this.formFixedIncome.get(controlName);
  }

  displayFn(item: ItemInfo) {
    return item?.nome;
  }

  getIndexers(productTypeId: number) {
    const control = this.formFixedIncome.get('indexer');

    if (control.disabled) {
      this.formFixedIncome.get('indexer').enable();
    } else {
      this.formFixedIncome.get('indexer').reset();
    }

    this.indexers$ = this._itemInfoService.getIndexers(productTypeId);
  }

  submit() {
    this.fixedIncomeId ? this.update() : this.create();
  }

  update() {
    const { description, minInvestment, indexer, productType } = this.formFixedIncome.controls;
    const date = this.getControl('validDate').value as Date;

    console.log(date);

    const request: FixedIncomePutRequest = {
      id: this.fixedIncomeId,
      descricao: description.value,
      dataValidade: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      investimentoMinimo: minInvestment.value,
      indexadorId: indexer.value?.id,
      tipoProdutoId: productType?.value?.id,
    };

    this._fixedIncomeStore.update(request);
  }

  create() {
    const { description, minInvestment, indexer, productType } = this.formFixedIncome.controls;
    const date = this.getControl('validDate').value as Date;

    const request: FixedIncomePostRequest = {
      descricao: description.value,
      dataValidade: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      investimentoMinimo: minInvestment.value,
      indexadorId: indexer.value?.id,
      tipoProdutoId: productType?.value?.id,
    };

    this._fixedIncomeStore.create(request);
  }
}
