import { Card, Group, Stack, Text, Title, ThemeIcon } from "@mantine/core";
import type { MantineColor } from "@mantine/core";

type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: MantineColor;
  hint?: string;
};

export function KpiCard({ title, value, icon, color = "violet", hint }: Props) {
  return (
    <Card withBorder radius="lg" p="lg">
      <Group justify="space-between" align="flex-start">
        <Stack gap={2}>
          <Text size="sm" c="dimmed" fw={700}>
            {title}
          </Text>
          <Title order={3}>{value}</Title>
          {hint ? (
            <Text size="xs" c="dimmed">
              {hint}
            </Text>
          ) : null}
        </Stack>

        <ThemeIcon variant="light" color={color} radius="md" size={40}>
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  );
}