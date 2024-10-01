import { Routes } from '@angular/router';
import { ListFixedIncomeComponent } from './pages/list-fixed-income/list-fixed-income.component';

export const routes: Routes = [
  {
    path: '',
    component: ListFixedIncomeComponent,
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-fixed-income/create-fixed-income.component').then(
        (m) => m.CreateFixedIncomeComponent
      ),
  },
  {
    path: 'create/:id',
    loadComponent: () =>
      import('./pages/create-fixed-income/create-fixed-income.component').then(
        (m) => m.CreateFixedIncomeComponent
      ),
  },
];
