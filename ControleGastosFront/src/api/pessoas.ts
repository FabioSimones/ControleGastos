import { http } from "./http";
import { endpoints } from "./endpoints";

export type Pessoa = {
  id: number;
  nome: string;
  idade: number;
};

export const pessoasApi = {
  listar: async (): Promise<Pessoa[]> => {
    const { data } = await http.get(endpoints.pessoas);
    return data;
  },

  criar: async (payload: Omit<Pessoa, "id">) => {
    const { data } = await http.post(endpoints.pessoas, payload);
    return data;
  },

  atualizar: async (id: number, payload: Omit<Pessoa, "id">) => {
    const { data } = await http.put(`${endpoints.pessoas}/${id}`, payload);
    return data;
  },

  deletar: async (id: number) => {
    await http.delete(`${endpoints.pessoas}/${id}`);
  },
};
