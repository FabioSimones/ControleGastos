import {
  AppShell,
  Box,
  Burger,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconUsers,
  IconTags,
  IconArrowsExchange,
} from "@tabler/icons-react";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <IconLayoutDashboard size={18} /> },
  { label: "Pessoas", path: "/pessoas", icon: <IconUsers size={18} /> },
  { label: "Categorias", path: "/categorias", icon: <IconTags size={18} /> },
  { label: "Transações", path: "/transacoes", icon: <IconArrowsExchange size={18} /> },
];

export function AppShellLayout() {
  // mobile: abre/fecha menu
  const [mobileOpened, mobile] = useDisclosure(false);

  // desktop: colapsa sidebar (fica só ícones)
  const [collapsed, desktop] = useDisclosure(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navbarWidth = collapsed ? 88 : 280;

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: navbarWidth,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="lg"
    >
      {/* Header com gradiente leve */}
      <AppShell.Header
        style={{
          background:
            "linear-gradient(90deg, rgba(124,58,237,0.10), rgba(59,130,246,0.08))",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Group h="100%" px="lg" justify="space-between">
          <Group gap="sm">
            {/* Burger mobile */}
            <Burger
              opened={mobileOpened}
              onClick={mobile.toggle}
              hiddenFrom="sm"
              size="sm"
            />

            {/* Botão desktop (hambúrguer) pra colapsar */}
            <Burger
              opened={!collapsed}
              onClick={desktop.toggle}
              visibleFrom="sm"
              size="sm"
            />

            <Text fw={800}>Controle de Gastos</Text>
          </Group>

          <Text size="sm" c="dimmed">
            React + TS
          </Text>
        </Group>
      </AppShell.Header>

      {/* Sidebar */}
      <AppShell.Navbar
        p="md"
        style={{
          background: "white",
          borderRight: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Stack gap="xs">
          <Text size="xs" c="dimmed" fw={700} style={{ letterSpacing: 0.6 }}>
            MENU
          </Text>

          <Divider />

          {NAV.map((item) => {
            const active = location.pathname === item.path;

            return (
              <UnstyledButton
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  mobile.close();
                }}
                style={{
                  width: "100%",
                  padding: collapsed ? "12px 10px" : "10px 12px",
                  borderRadius: 12,
                  background: active ? "rgba(124,58,237,0.12)" : "transparent",
                  border: active ? "1px solid rgba(124,58,237,0.25)" : "1px solid transparent",
                  transition: "120ms ease",
                }}
              >
                <Group gap="sm" justify={collapsed ? "center" : "flex-start"}>
                  <ThemeIcon
                    variant={active ? "light" : "subtle"}
                    color="violet"
                    radius="md"
                    size={36}
                  >
                    {item.icon}
                  </ThemeIcon>

                  {!collapsed && (
                    <Text size="sm" fw={700}>
                      {item.label}
                    </Text>
                  )}
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </AppShell.Navbar>

      {/* Conteúdo */}
      <AppShell.Main>
        <Box maw={1200} mx="auto" py="lg">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
