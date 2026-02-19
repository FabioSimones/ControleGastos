import { Card, Group, Stack, Text, Title } from "@mantine/core";

type PageTemplateProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
};

export function PageTemplate({ title, subtitle, rightSlot, children }: PageTemplateProps) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-start">
        <div>
          <Title order={2}>{title}</Title>
          {subtitle ? (
            <Text c="dimmed" mt={4}>
              {subtitle}
            </Text>
          ) : null}
        </div>

        {rightSlot ? <div>{rightSlot}</div> : null}
      </Group>

      <Card withBorder radius="lg" p="lg">
        {children}
      </Card>
    </Stack>
  );
}
