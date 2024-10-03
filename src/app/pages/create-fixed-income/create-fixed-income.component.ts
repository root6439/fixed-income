import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ItemInfo } from '../../models/item-info.model';
import { ItemInfoService } from '../../services/item-info.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  ],
  templateUrl: './create-fixed-income.component.html',
  styleUrl: './create-fixed-income.component.scss',
})
export class CreateFixedIncomeComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _itemInfoService = inject(ItemInfoService);

  formFixedIncome = this._fb.group({
    description: ['', Validators.required],
    validDate: ['', [Validators.required]],
    minInvestment: ['', Validators.required],
    productType: ['', Validators.required],
    indexer: [{ value: '', disabled: true }, Validators.required],
  });

  productTypes$: Observable<ItemInfo[]>;
  indexers$: Observable<ItemInfo[]>;

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
}
