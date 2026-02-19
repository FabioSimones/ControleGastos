import { http } from "./http";
import { endpoints } from "./endpoints";

export type TotaisPorPessoaResponse = {
  itens: {
    pessoaId: number;
    pessoaNome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  }[];
  totalReceitasGeral: number;
  totalDespesasGeral: number;
  saldoLiquidoGeral: number;
};

export const relatoriosApi = {
  totaisPorPessoa: async (): Promise<TotaisPorPessoaResponse> => {
    const { data } = await http.get(endpoints.totaisPorPessoa);
    return data;
  },
};
