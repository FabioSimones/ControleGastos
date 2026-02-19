import { NavLink } from "react-router-dom";
import { Group, Text, UnstyledButton } from "@mantine/core";

type NavLinkItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
};
        
export function NavLinkItem({ to, label, icon }: NavLinkItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => isActive ? "active-link" : ""}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {({ isActive }) => (
        <UnstyledButton
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
          }}
        >
      <Group gap="sm">
        {icon}
        <Text size="sm" fw={600}>
          {label}
        </Text>
      </Group>
        </UnstyledButton>
      )}
    </NavLink>
  );
}
