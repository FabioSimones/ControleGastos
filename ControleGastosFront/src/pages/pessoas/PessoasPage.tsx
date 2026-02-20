import { useMemo, useState } from "react";
import {
  Button,
  Group,
  Table,
  Text,
  ActionIcon,
  Badge,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PageTemplate } from "../../components/PageTemplate";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { PessoaFormModal } from "./PessoaFormModal";
import { pessoasApi, type Pessoa } from "../../api/pessoas";

export function PessoasPage() {
  const qc = useQueryClient();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Pessoa | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Pessoa | null>(null);

  const pessoasQuery = useQuery({
    queryKey: ["pessoas"],
    queryFn: pessoasApi.listar,
  });

  const createMut = useMutation({
    mutationFn: pessoasApi.criar,
    onSuccess: async () => {
      notifications.show({ message: "Pessoa criada com sucesso ✅" });
      setFormOpen(false);
      await qc.invalidateQueries({ queryKey: ["pessoas"] });
    },
    onError: (e: Error) => notifications.show({ color: "red", message: e.message }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { nome: string; idade: number } }) =>
      pessoasApi.atualizar(id, payload),
    onSuccess: async () => {
      notifications.show({ message: "Pessoa atualizada com sucesso ✅" });
      setFormOpen(false);
      setEditing(null);
      await qc.invalidateQueries({ queryKey: ["pessoas"] });
    },
    onError: (e: Error) => notifications.show({ color: "red", message: e.message }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => pessoasApi.deletar(id),
    onSuccess: async () => {
      notifications.show({ message: "Pessoa removida ✅ (transações apagadas no back-end)" });
      setDeleteOpen(false);
      setDeleting(null);
      await qc.invalidateQueries({ queryKey: ["pessoas"] });
    },
    onError: (e: Error) => notifications.show({ color: "red", message: e.message }),
  });

  const rows = useMemo(() => (pessoasQuery.data ?? []), [pessoasQuery.data]);

  return (
    <PageTemplate
      title="Pessoas"
      subtitle="Crie, edite e remova pessoas. Ao excluir uma pessoa, suas transações também são removidas."
      rightSlot={
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Nova pessoa
        </Button>
      }
    >
      {pessoasQuery.isLoading && (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      )}

      {pessoasQuery.isError && (
        <Text c="red">
          Erro ao carregar pessoas: {(pessoasQuery.error as Error).message}
        </Text>
      )}

      {!pessoasQuery.isLoading && !pessoasQuery.isError && rows.length === 0 && (
        <Text c="dimmed">Nenhuma pessoa cadastrada ainda.</Text>
      )}

      {!pessoasQuery.isLoading && rows.length > 0 && (
        <Table highlightOnHover withTableBorder verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Idade</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {rows.map((p) => (
              <Table.Tr key={p.id}>
                <Table.Td>{p.id}</Table.Td>
                <Table.Td>{p.nome}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Text>{p.idade}</Text>
                    {p.idade < 18 ? (
                      <Badge variant="light" color="yellow">
                        Menor
                      </Badge>
                    ) : null}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      onClick={() => {
                        setEditing(p);
                        setFormOpen(true);
                      }}
                      aria-label="Editar"
                    >
                      <IconPencil size={18} />
                    </ActionIcon>

                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => {
                        setDeleting(p);
                        setDeleteOpen(true);
                      }}
                      aria-label="Excluir"
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      <PessoaFormModal
        opened={formOpen}
        initial={editing}
        loading={createMut.isPending || updateMut.isPending}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={(payload) => {
          if (editing) updateMut.mutate({ id: editing.id, payload });
          else createMut.mutate(payload);
        }}
      />

      <ConfirmDialog
        opened={deleteOpen}
        title="Excluir pessoa?"
        description={`Isso irá remover "${deleting?.nome ?? ""}" e todas as transações relacionadas. Deseja continuar?`}
        loading={deleteMut.isPending}
        onClose={() => {
          setDeleteOpen(false);
          setDeleting(null);
        }}
        onConfirm={() => {
          if (deleting) deleteMut.mutate(deleting.id);
        }}
      />
    </PageTemplate>
  );
}