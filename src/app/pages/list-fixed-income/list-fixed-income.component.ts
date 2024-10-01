import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FixedIncome } from '../../models/fixed-income.model';
import { FixedIncomeService } from '../../services/fixed-income.service';
import { finalize, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-fixed-income',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './list-fixed-income.component.html',
  styleUrl: './list-fixed-income.component.scss',
})
export class ListFixedIncomeComponent implements OnInit {
  private _service = inject(FixedIncomeService);

  fixedIncomes$: Observable<FixedIncome[]>;

  displayedColumns = [
    'id',
    'description',
    'validDate',
    'minimumInvestment',
    'product',
    'indexer',
    'actions',
  ];

  ngOnInit(): void {
    // this.getData();
  }

  getData() {
    this.fixedIncomes$ = this._service.getList();
  }
}
