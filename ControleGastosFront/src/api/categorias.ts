import { http } from "./http";
import { endpoints } from "./endpoints";

export type Categoria = {
  id: number;
  descricao: string;
  finalidade: number; // enum vindo do back
};

export const categoriasApi = {
  listar: async (): Promise<Categoria[]> => {
    const { data } = await http.get(endpoints.categorias);
    return data;
  },

  criar: async (payload: Omit<Categoria, "id">) => {
    const { data } = await http.post(endpoints.categorias, payload);
    return data;
  },
};
