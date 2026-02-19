import { Text } from "@mantine/core";
import { PageTemplate } from "../components/PageTemplate";

export function DashboardPage() {
  return (
    <PageTemplate
      title="Dashboard"
      subtitle="Resumo geral e totais por pessoa (em breve)"
    >
      <Text c="dimmed">
        Layout e rotas OK. Próxima etapa: buscar dados do endpoint de relatórios.
      </Text>
    </PageTemplate>
  );
}
