import {
  Group,
  Loader,
  SimpleGrid,
  Table,
  Text,
  Badge,
  Card,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { IconArrowDownRight, IconArrowUpRight, IconScale } from "@tabler/icons-react";

import { PageTemplate } from "../../components/PageTemplate";
import { KpiCard } from "../../components/KpiCard";
import { relatoriosApi } from "../../api/relatorios";
import { formatBRL } from "../../utils/format";

import { useEffect, useMemo, useState } from "react";
import { ReportDateRange } from "../../components/ReportDateRange";
import { notifications } from "@mantine/notifications";

export function DashboardPage() {
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({});
  const [tipoView, setTipoView] = useState<"todos" | "receitas" | "despesas">("todos");

  const query = useQuery({
    queryKey: [
      "relatorios",
      "totais-por-pessoa",
      range.start?.toISOString(),
      range.end?.toISOString(),
    ],
    queryFn: () => relatoriosApi.totaisPorPessoa(range),
  });

  useEffect(() => {
    if (query.isError) {
      notifications.show({
        color: "red",
        message: (query.error as Error).message ?? "Erro ao carregar relatório",
      });
    }
  }, [query.isError, query.error]);

  const kpis = useMemo(() => {
    const receitas = query.data?.totalReceitasGeral ?? 0;
    const despesas = query.data?.totalDespesasGeral ?? 0;
    const saldo = query.data?.saldoLiquidoGeral ?? 0;

    if (tipoView === "receitas") {
      return { receitas, despesas: null, saldo: null };
    }

    if (tipoView === "despesas") {
      return { receitas: null, despesas, saldo: null };
    }

    return { receitas, despesas, saldo };
  }, [query.data, tipoView]);

  return (
    <PageTemplate
      title="Dashboard"
      subtitle="Resumo financeiro por pessoa (com filtro por período)."
      rightSlot={<ReportDateRange onApply={setRange} />}
    >
      {/* Filtro por tipo (visual) */}
      <Stack gap="sm" mb="md">
        <SegmentedControl
          value={tipoView}
          onChange={(value: string) =>
            setTipoView(value as "todos" | "receitas" | "despesas")
          }
          data={[
            { value: "todos", label: "Todos" },
            { value: "receitas", label: "Receitas" },
            { value: "despesas", label: "Despesas" },
          ]}
        />
      </Stack>

      {query.isLoading && (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      )}

      {query.isError && (
        <Text c="red">
          Erro ao carregar relatório: {(query.error as Error).message}
        </Text>
      )}

      {!query.isLoading && !query.isError && query.data?.itens?.length === 0 && (
        <Text c="dimmed">
          Ainda não há dados para exibir. Cadastre pessoas, categorias e transações.
        </Text>
      )}

      {!query.isLoading && !query.isError && query.data && (
        <>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            <KpiCard
              title="Total de Receitas"
              value={kpis.receitas === null ? "—" : formatBRL(kpis.receitas)}
              icon={<IconArrowUpRight size={20} />}
              color="green"
            />
            <KpiCard
              title="Total de Despesas"
              value={kpis.despesas === null ? "—" : formatBRL(kpis.despesas)}
              icon={<IconArrowDownRight size={20} />}
              color="red"
            />
            <KpiCard
              title="Saldo Líquido"
              value={kpis.saldo === null ? "—" : formatBRL(kpis.saldo)}
              icon={<IconScale size={20} />}
              color={(query.data.saldoLiquidoGeral ?? 0) >= 0 ? "violet" : "orange"}
              hint={kpis.saldo === null ? undefined : "Receitas - Despesas"}
            />
          </SimpleGrid>

          <Card withBorder radius="lg" p="lg" mt="md">
            <Table highlightOnHover withTableBorder verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Pessoa</Table.Th>

                  {(tipoView === "todos" || tipoView === "receitas") && (
                    <Table.Th>Receitas</Table.Th>
                  )}

                  {(tipoView === "todos" || tipoView === "despesas") && (
                    <Table.Th>Despesas</Table.Th>
                  )}

                  {tipoView === "todos" && <Table.Th>Saldo</Table.Th>}
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {query.data.itens.map((i: typeof query.data.itens[number]) => (
                  <Table.Tr key={i.pessoaId}>
                    <Table.Td>
                      <Text fw={700}>{i.pessoaNome}</Text>
                      <Text size="xs" c="dimmed">
                        ID: {i.pessoaId}
                      </Text>
                    </Table.Td>

                    {(tipoView === "todos" || tipoView === "receitas") && (
                      <Table.Td>{formatBRL(i.totalReceitas)}</Table.Td>
                    )}

                    {(tipoView === "todos" || tipoView === "despesas") && (
                      <Table.Td>{formatBRL(i.totalDespesas)}</Table.Td>
                    )}

                    {tipoView === "todos" && (
                      <Table.Td>
                        <Badge variant="light" color={i.saldo >= 0 ? "green" : "red"}>
                          {formatBRL(i.saldo)}
                        </Badge>
                      </Table.Td>
                    )}
                  </Table.Tr>
                ))}

                {/* Rodapé total geral */}
                <Table.Tr>
                  <Table.Td>
                    <Text fw={800}>TOTAL GERAL</Text>
                  </Table.Td>

                  {(tipoView === "todos" || tipoView === "receitas") && (
                    <Table.Td>
                      <Text fw={800}>{formatBRL(query.data.totalReceitasGeral)}</Text>
                    </Table.Td>
                  )}

                  {(tipoView === "todos" || tipoView === "despesas") && (
                    <Table.Td>
                      <Text fw={800}>{formatBRL(query.data.totalDespesasGeral)}</Text>
                    </Table.Td>
                  )}

                  {tipoView === "todos" && (
                    <Table.Td>
                      <Badge
                        variant="light"
                        color={query.data.saldoLiquidoGeral >= 0 ? "green" : "red"}
                      >
                        {formatBRL(query.data.saldoLiquidoGeral)}
                      </Badge>
                    </Table.Td>
                  )}
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </>
      )}
    </PageTemplate>
  );
}