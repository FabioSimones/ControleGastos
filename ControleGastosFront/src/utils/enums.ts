
export const FinalidadeCategoria = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3,
} as const;

export type FinalidadeCategoria = typeof FinalidadeCategoria[keyof typeof FinalidadeCategoria];

export const finalidadeLabel: Record<number, string> = {
  [FinalidadeCategoria.Despesa]: "Despesa",
  [FinalidadeCategoria.Receita]: "Receita",
  [FinalidadeCategoria.Ambas]: "Ambas",
};


export const TipoTransacao = {
  Despesa: 1,
  Receita: 2,
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

export const tipoLabel: Record<number, string> = {
  [TipoTransacao.Despesa]: "Despesa",
  [TipoTransacao.Receita]: "Receita",
};