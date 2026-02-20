import { useMemo, useState } from "react";
import { Button, Group, Loader, Table, Text, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PageTemplate } from "../../components/PageTemplate";
import { CategoriaFormModal } from "./CategoriaFormModal";
import { categoriasApi } from "../../api/categorias";
import { finalidadeLabel, FinalidadeCategoria } from "../../utils/enums";

export function CategoriasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const categoriasQuery = useQuery({
    queryKey: ["categorias"],
    queryFn: categoriasApi.listar,
  });

  const createMut = useMutation({
    mutationFn: categoriasApi.criar,
    onSuccess: async () => {
      notifications.show({ message: "Categoria criada com sucesso ✅" });
      setOpen(false);
      await qc.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError: (e: Error) =>
      notifications.show({ color: "red", message: e.message }),
  });

  const rows = useMemo(() => categoriasQuery.data ?? [], [categoriasQuery.data]);

  function badgeColor(finalidade: number) {
    if (finalidade === FinalidadeCategoria.Despesa) return "red";
    if (finalidade === FinalidadeCategoria.Receita) return "green";
    return "violet";
  }

  return (
    <PageTemplate
      title="Categorias"
      subtitle="Cadastre categorias com finalidade (despesa/receita/ambas)."
      rightSlot={
        <Button leftSection={<IconPlus size={18} />} onClick={() => setOpen(true)}>
          Nova categoria
        </Button>
      }
    >
      {categoriasQuery.isLoading && (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      )}

      {categoriasQuery.isError && (
        <Text c="red">
          Erro ao carregar categorias: {(categoriasQuery.error as Error).message}
        </Text>
      )}

      {!categoriasQuery.isLoading && !categoriasQuery.isError && rows.length === 0 && (
        <Text c="dimmed">Nenhuma categoria cadastrada ainda.</Text>
      )}

      {!categoriasQuery.isLoading && rows.length > 0 && (
        <Table highlightOnHover withTableBorder verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Descrição</Table.Th>
              <Table.Th>Finalidade</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {rows.map((c) => (
              <Table.Tr key={c.id}>
                <Table.Td>{c.id}</Table.Td>
                <Table.Td>{c.descricao}</Table.Td>
                <Table.Td>
                  <Badge variant="light" color={badgeColor(c.finalidade)}>
                    {finalidadeLabel[c.finalidade] ?? `Finalidade ${c.finalidade}`}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      <CategoriaFormModal
        opened={open}
        loading={createMut.isPending}
        onClose={() => setOpen(false)}
        onSubmit={(payload) => createMut.mutate(payload)}
      />
    </PageTemplate>
  );
}