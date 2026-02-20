import { Button, Group, SegmentedControl } from "@mantine/core";
import { IconCalendarMonth, IconClock } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type Props = {
  onApply: (range: { start: Date; end: Date }) => void;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

export function ReportDateRange({ onApply }: Props) {
  const [preset, setPreset] = useState<"mes" | "30d">("mes");

  useEffect(() => {
    const now = new Date();

    if (preset === "mes") {
      onApply({ start: startOfMonth(now), end: endOfMonth(now) });
      return;
    }

    onApply({ start: addDays(now, -30), end: now });
  }, [preset, onApply]);

  return (
    <Group gap="sm" wrap="wrap">
      <SegmentedControl
        value={preset}
        onChange={(v) => setPreset(v as "mes" | "30d")}
        data={[
          { value: "mes", label: "Este mês" },
          { value: "30d", label: "Últimos 30 dias" },
        ]}
      />

      <Button
        variant="default"
        leftSection={preset === "mes" ? <IconCalendarMonth size={18} /> : <IconClock size={18} />}
        onClick={() => {
          // reaplica manualmente, se quiser
          const now = new Date();
          if (preset === "mes") onApply({ start: startOfMonth(now), end: endOfMonth(now) });
          else onApply({ start: addDays(now, -30), end: now });
        }}
      >
        Reaplicar
      </Button>
    </Group>
  );
}