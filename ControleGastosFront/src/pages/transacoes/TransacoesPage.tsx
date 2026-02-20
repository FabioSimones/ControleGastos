import { useMemo, useState } from "react";
import { Button, Group, Loader, Table, Text, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PageTemplate } from "../../components/PageTemplate";
import { transacoesApi } from "../../api/transacoes";
import { pessoasApi } from "../../api/pessoas";
import { categoriasApi } from "../../api/categorias";
import { TransacaoFormModal } from "./TransacaoFormModal";
import { formatBRL } from "../../utils/format";
import { tipoLabel, TipoTransacao } from "../../utils/enums";

export function TransacoesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const pessoasQuery = useQuery({ queryKey: ["pessoas"], queryFn: pessoasApi.listar });
  const categoriasQuery = useQuery({ queryKey: ["categorias"], queryFn: categoriasApi.listar });
  const transacoesQuery = useQuery({ queryKey: ["transacoes"], queryFn: transacoesApi.listar });

  const createMut = useMutation({
    mutationFn: transacoesApi.criar,
    onSuccess: async () => {
      notifications.show({ message: "Transação criada com sucesso ✅" });
      setOpen(false);
      await qc.invalidateQueries({ queryKey: ["transacoes"] });
    },
    onError: (e: Error) => notifications.show({ color: "red", message: e.message }),
  });

  const pessoas = pessoasQuery.data ?? [];
  const categorias = categoriasQuery.data ?? [];
  const transacoes = useMemo(() => transacoesQuery.data ?? [], [transacoesQuery.data]);

  const carregandoBase = pessoasQuery.isLoading || categoriasQuery.isLoading;

  return (
    <PageTemplate
      title="Transações"
      subtitle="Crie transações respeitando regras de menor de idade e finalidade da categoria."
      rightSlot={
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpen(true)}
          disabled={carregandoBase || pessoas.length === 0 || categorias.length === 0}
        >
          Nova transação
        </Button>
      }
    >
      {carregandoBase && (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      )}

      {!carregandoBase && (pessoas.length === 0 || categorias.length === 0) && (
        <Text c="dimmed">
          Para cadastrar transações, você precisa ter pelo menos <b>1 pessoa</b> e <b>1 categoria</b>.
        </Text>
      )}

      {transacoesQuery.isLoading && (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      )}

      {transacoesQuery.isError && (
        <Text c="red">Erro ao carregar transações: {(transacoesQuery.error as Error).message}</Text>
      )}

      {!transacoesQuery.isLoading && !transacoesQuery.isError && transacoes.length === 0 && (
        <Text c="dimmed">Nenhuma transação cadastrada ainda.</Text>
      )}

      {!transacoesQuery.isLoading && transacoes.length > 0 && (
        <Table highlightOnHover withTableBorder verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Descrição</Table.Th>
              <Table.Th>Valor</Table.Th>
              <Table.Th>Tipo</Table.Th>
              <Table.Th>PessoaId</Table.Th>
              <Table.Th>CategoriaId</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {transacoes.map((t) => (
              <Table.Tr key={t.id}>
                <Table.Td>{t.id}</Table.Td>
                <Table.Td>{t.descricao}</Table.Td>
                <Table.Td>{formatBRL(t.valor)}</Table.Td>
                <Table.Td>
                  <Badge
                    variant="light"
                    color={t.tipo === TipoTransacao.Despesa ? "red" : "green"}
                  >
                    {tipoLabel[t.tipo] ?? `Tipo ${t.tipo}`}
                  </Badge>
                </Table.Td>
                <Table.Td>{t.pessoaId}</Table.Td>
                <Table.Td>{t.categoriaId}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      <TransacaoFormModal
        opened={open}
        loading={createMut.isPending}
        pessoas={pessoas}
        categorias={categorias}
        onClose={() => setOpen(false)}
        onSubmit={(payload) => createMut.mutate(payload)}
      />
    </PageTemplate>
  );
}