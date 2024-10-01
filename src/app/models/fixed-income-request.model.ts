import { FixedIncome } from './fixed-income.model';

export type FixedIncomePostRequest = Omit<
  FixedIncome,
  'id' | 'tipoProduto' | 'indexador'
>;

export type FixedIncomePutRequest = Omit<
  FixedIncome,
  'tipoProduto' | 'indexador'
>;
