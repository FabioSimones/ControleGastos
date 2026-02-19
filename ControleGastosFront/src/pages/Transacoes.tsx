import { Text } from "@mantine/core";
import { PageTemplate } from "../components/PageTemplate";

export function TransacoesPage() {
  return (
    <PageTemplate title="Transações" subtitle="Cadastro e listagem de transações">
      <Text c="dimmed">
        Em breve: formulário com regras (menor de idade e finalidade da categoria).
      </Text>
    </PageTemplate>
  );
}
