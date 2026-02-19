import { http } from "./http";
import { endpoints } from "./endpoints";

export type Transacao = {
  id: number;
  descricao: string;
  valor: number;
  tipo: number; // enum
  categoriaId: number;
  pessoaId: number;
};

export const transacoesApi = {
  listar: async (): Promise<Transacao[]> => {
    const { data } = await http.get(endpoints.transacoes);
    return data;
  },

  criar: async (payload: Omit<Transacao, "id">) => {
    const { data } = await http.post(endpoints.transacoes, payload);
    return data;
  },
};
