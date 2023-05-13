import { Box, Flex, NavLink, Stack, createStyles } from "@mantine/core";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import { useRouter } from "next/router";
import {
  APPOINTMENTS_PAGE,
  DASHBOARD_PAGE,
  MEMBERS_PAGE,
  PATIENTS_PAGE,
  SETTINGS_PAGE,
} from "~/data/routes";
import { type ReactNode } from "react";
import {
  IconCalendar,
  IconId,
  IconLayoutDashboard,
  IconSettings,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import AccountControls from "./AccountControls";

const useStyles = createStyles((theme) => ({
  sideMenu: {
    padding: theme.spacing.xs,
    height: "100vh",
    width: "280px",
    flexDirection: "column",
    gap: theme.spacing.lg,
    borderRight: "1px solid",
    borderColor: theme.colors.gray[2],
  },
  navLink: {
    borderRadius: theme.radius.sm,
  },
}));

export default function SideMenu() {
  const { classes } = useStyles();
  const router = useRouter();
  const workspaceId = router.query.workspaceId?.toString() ?? "";
  const navRoutes: Array<{ label: string; path: string; icon?: ReactNode }> = [
    {
      label: "Dashboard",
      path: DASHBOARD_PAGE(workspaceId).path,
      icon: <IconLayoutDashboard stroke={1.5} />,
    },
    {
      label: "Pacientes",
      path: PATIENTS_PAGE(workspaceId).path,
      icon: <IconId stroke={1.5} />,
    },
    {
      label: "Citas",
      path: APPOINTMENTS_PAGE(workspaceId).path,
      icon: <IconCalendar stroke={1.5} />,
    },
    {
      label: "Miembros",
      path: MEMBERS_PAGE(workspaceId).path,
      icon: <IconUsersGroup stroke={1.5} />,
    },
    {
      label: "Configuración",
      path: SETTINGS_PAGE(workspaceId).path,
      icon: <IconSettings stroke={1.5} />,
    },
  ];

  return (
    <Flex className={classes.sideMenu}>
      <WorkspaceSwitcher />
      <Stack justify="space-between" h="100%">
        <Box>
          {navRoutes.map((navRoute, index) => (
            <Link key={index} href={navRoute.path} legacyBehavior passHref>
              <NavLink
                className={classes.navLink}
                label={navRoute.label}
                icon={navRoute?.icon}
                active={router.asPath === navRoute.path}
              />
            </Link>
          ))}
        </Box>
        <AccountControls />
      </Stack>
    </Flex>
  );
}
