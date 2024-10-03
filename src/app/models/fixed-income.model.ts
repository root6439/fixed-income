import { ItemInfo } from './item-info.model';

export class FixedIncome {
  id: number;
  descricao: string;
  dataValidade: string;
  investimentoMinimo: number;
  tipoProdutoId: number;
  tipoProduto: ItemInfo;
  indexadorId: number;
  indexador: ItemInfo;
}
