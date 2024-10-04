import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FixedIncomeStore } from '../../store/fixed-income-store.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent implements OnInit {
  private _store = inject(FixedIncomeStore);

  control = new FormControl('');

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this._store.getList(value));
  }
}
