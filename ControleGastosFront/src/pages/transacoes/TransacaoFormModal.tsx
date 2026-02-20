import { Button, Group, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Pessoa } from "../../api/pessoas";
import type { Categoria } from "../../api/categorias";
import { FinalidadeCategoria, TipoTransacao } from "../../utils/enums";

type Props = {
  opened: boolean;
  loading?: boolean;
  pessoas: Pessoa[];
  categorias: Categoria[];
  onClose: () => void;
  onSubmit: (payload: {
    descricao: string;
    valor: number;
    tipo: number;
    pessoaId: number;
    categoriaId: number;
  }) => void;
};

export function TransacaoFormModal({
  opened,
  loading,
  pessoas,
  categorias,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm({
    initialValues: {
      descricao: "",
      valor: 0,
      tipo: String(TipoTransacao.Despesa),
      pessoaId: pessoas[0]?.id ? String(pessoas[0].id) : "",
      categoriaId: "",
    },
    validate: {
      descricao: (v) =>
        v.trim().length === 0
          ? "Descrição é obrigatória"
          : v.length > 400
            ? "Descrição deve ter no máximo 400 caracteres"
            : null,
      valor: (v) => (v <= 0 ? "Valor deve ser maior que zero" : null),
      tipo: (v) => (!v ? "Tipo é obrigatório" : null),
      pessoaId: (v) => (!v ? "Pessoa é obrigatória" : null),
      categoriaId: (v) => (!v ? "Categoria é obrigatória" : null),
    },
  });

  const pessoaSelecionada = pessoas.find((p) => String(p.id) === form.values.pessoaId);
  const pessoaMenor = (pessoaSelecionada?.idade ?? 18) < 18;

  const tipoEfetivo = pessoaMenor ? String(TipoTransacao.Despesa) : form.values.tipo;

  const categoriasFiltradas = categorias.filter((c) => {
    const tipo = Number(tipoEfetivo);
    if (tipo === TipoTransacao.Despesa) {
      return c.finalidade === FinalidadeCategoria.Despesa || c.finalidade === FinalidadeCategoria.Ambas;
    }
    return c.finalidade === FinalidadeCategoria.Receita || c.finalidade === FinalidadeCategoria.Ambas;
  });

  if (pessoaMenor && form.values.tipo !== String(TipoTransacao.Despesa)) {
    form.setFieldValue("tipo", String(TipoTransacao.Despesa));
  }

  const categoriaValida = categoriasFiltradas.some((c) => String(c.id) === form.values.categoriaId);
  if (form.values.categoriaId && !categoriaValida) {
    form.setFieldValue("categoriaId", "");
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Nova transação" centered size="lg">
      <form
        onSubmit={form.onSubmit((values) =>
          onSubmit({
            descricao: values.descricao.trim(),
            valor: values.valor,
            tipo: Number(values.tipo),
            pessoaId: Number(values.pessoaId),
            categoriaId: Number(values.categoriaId),
          })
        )}
      >
        <TextInput
          label="Descrição"
          placeholder="Ex.: Mercado, Salário, Conta de luz..."
          withAsterisk
          {...form.getInputProps("descricao")}
        />

        <NumberInput
          mt="md"
          label="Valor"
          withAsterisk
          min={0}
          clampBehavior="strict"
          value={form.values.valor}
          onChange={(v) => form.setFieldValue("valor", Number(v ?? 0))}
          error={form.errors.valor}
        />

        <Select
          mt="md"
          label="Pessoa"
          withAsterisk
          data={pessoas.map((p) => ({
            value: String(p.id),
            label: `${p.nome} (${p.idade} anos)`,
          }))}
          {...form.getInputProps("pessoaId")}
        />

        <Select
          mt="md"
          label="Tipo"
          withAsterisk
          disabled={pessoaMenor}
          description={pessoaMenor ? "Menor de idade: apenas despesas são permitidas." : undefined}
          data={[
            { value: String(TipoTransacao.Despesa), label: "Despesa" },
            { value: String(TipoTransacao.Receita), label: "Receita" },
          ]}
          {...form.getInputProps("tipo")}
        />

        <Select
          mt="md"
          label="Categoria"
          withAsterisk
          data={categoriasFiltradas.map((c) => ({
            value: String(c.id),
            label: c.descricao,
          }))}
          {...form.getInputProps("categoriaId")}
        />

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} disabled={!form.isValid()}>
            Salvar
          </Button>
        </Group>
      </form>
    </Modal>
  );
}