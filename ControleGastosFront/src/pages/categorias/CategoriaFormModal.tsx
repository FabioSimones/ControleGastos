import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FinalidadeCategoria } from "../../utils/enums";

type Props = {
  opened: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: { descricao: string; finalidade: number }) => void;
};

export function CategoriaFormModal({ opened, loading, onClose, onSubmit }: Props) {
  const form = useForm({
    initialValues: {
      descricao: "",
      finalidade: String(FinalidadeCategoria.Despesa),
    },
    validate: {
      descricao: (v) =>
        v.trim().length === 0
          ? "Descrição é obrigatória"
          : v.length > 400
            ? "Descrição deve ter no máximo 400 caracteres"
            : null,
      finalidade: (v) => (!v ? "Finalidade é obrigatória" : null),
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Nova categoria" centered>
      <form
        onSubmit={form.onSubmit((values) =>
          onSubmit({
            descricao: values.descricao.trim(),
            finalidade: Number(values.finalidade),
          })
        )}
      >
        <TextInput
          label="Descrição"
          placeholder="Ex.: Alimentação, Transporte, Salário..."
          withAsterisk
          {...form.getInputProps("descricao")}
        />

        <Select
          mt="md"
          label="Finalidade"
          withAsterisk
          data={[
            { value: String(FinalidadeCategoria.Despesa), label: "Despesa" },
            { value: String(FinalidadeCategoria.Receita), label: "Receita" },
            { value: String(FinalidadeCategoria.Ambas), label: "Ambas" },
          ]}
          {...form.getInputProps("finalidade")}
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