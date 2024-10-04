import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FixedIncome } from '../../models/fixed-income.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FixedIncomeStore } from '../../store/fixed-income-store.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';

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
    MatPaginatorModule,
    MatSortModule,
    SearchFilterComponent
  ],
  templateUrl: './list-fixed-income.component.html',
  styleUrl: './list-fixed-income.component.scss',
})
export class ListFixedIncomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _store = inject(FixedIncomeStore);

  dataSource: MatTableDataSource<FixedIncome>;

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
    this._store.state$.subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });

    this._store.getList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
