import { http } from "./http";
import { endpoints } from "./endpoints";

export type Categoria = {
  id: number;
  descricao: string;
  finalidade: number; 
};

export type CategoriaCreate = {
  descricao: string;
  finalidade: number;
};

export const categoriasApi = {
  listar: async (): Promise<Categoria[]> => {
    const { data } = await http.get(endpoints.categorias);
    return data;
  },

  criar: async (payload: CategoriaCreate) => {
    const { data } = await http.post(endpoints.categorias, payload);
    return data;
  },
};