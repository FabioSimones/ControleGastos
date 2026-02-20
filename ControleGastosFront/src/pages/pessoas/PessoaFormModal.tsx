import { Button, Group, Modal, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Pessoa } from "../../api/pessoas";

type Props = {
  opened: boolean;
  initial?: Pessoa | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: { nome: string; idade: number }) => void;
};

export function PessoaFormModal({ opened, initial, loading, onClose, onSubmit }: Props) {
  const form = useForm({
    initialValues: {
      nome: initial?.nome ?? "",
      idade: initial?.idade ?? 18,
    },
    validate: {
  nome: (v) =>
    v.trim().length === 0
      ? "Nome é obrigatório"
      : v.length > 200
        ? "Nome deve ter no máximo 200 caracteres"
        : null,
  idade: (v) =>
    v === null || Number.isNaN(v)
      ? "Idade é obrigatória"
      : v < 0
        ? "Idade não pode ser menor que zero"
        : null,
},
  });

  if (opened && initial && form.values.nome !== initial.nome) {
    form.setValues({ nome: initial.nome, idade: initial.idade });
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initial ? "Editar pessoa" : "Nova pessoa"}
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => onSubmit(values))}
      >
        <TextInput
          label="Nome"
          placeholder="Ex.: Fábio Simones"
          withAsterisk
          {...form.getInputProps("nome")}
        />

        <NumberInput
          mt="md"
          label="Idade"
          min={0}
          clampBehavior="strict"   
          allowNegative={false}    
          value={form.values.idade}
          onChange={(val) => form.setFieldValue("idade", Number(val ?? 0))}
          error={form.errors.idade}
        />

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Salvar
          </Button>
        </Group>
      </form>
    </Modal>
  );
}