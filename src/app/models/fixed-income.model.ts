export class FixedIncome {
  id: number;
  descricao: string;
  dataValidade: string;
  investimentoMinimo: number;
  tipoProdutoId: number;
  tipoProduto: {
    id: number;
    nome: string;
  };
  indexadorId: number;
  indexador: {
    id: number;
    nome: string;
  };
}
