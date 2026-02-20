import { http } from "./http";
import { endpoints } from "./endpoints";

function toISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export const relatoriosApi = {
  totaisPorPessoa: async (range?: { start?: Date; end?: Date }) => {
    const params: Record<string, string> = {};
    if (range?.start) params.dataInicio = toISODate(range.start);
    if (range?.end) params.dataFim = toISODate(range.end);

    const { data } = await http.get(endpoints.totaisPorPessoa, { params });
    return data;
  },
};