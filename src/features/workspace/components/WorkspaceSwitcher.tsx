import {
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  Text,
  createStyles,
  Button,
} from "@mantine/core";
import { type Workspace } from "@prisma/client";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CREATE_WORKSPACE_PAGE, DASHBOARD_PAGE } from "~/data/routes";
import { api } from "~/utils/api";

const useStyles = createStyles((theme) => ({
  workspaceSwitcher: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
  menuActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export default function WorkspaceSwitcher() {
  const router = useRouter();
  const { classes } = useStyles();
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

  const workspaceQuery = api.workspace.byId.useQuery({
    workspaceId: router.query.workspaceId?.toString() ?? "",
  });
  const workspacesQuery = api.member.workspaces.useQuery(undefined, {
    enabled: Boolean(workspaceQuery.data),
    onSuccess(nextWorkspaces) {
      if (selectedWorkspace) return;
      const activeWorkspaceId = workspaceQuery.data?.id;
      const matchingWorkspace = nextWorkspaces.find(
        (workspace) => workspace.id === activeWorkspaceId
      );
      const firstWorkspace = nextWorkspaces.find(Boolean);
      setSelectedWorkspace(matchingWorkspace ?? firstWorkspace);
    },
  });

  function selectWorkspace(workspace: Workspace) {
    setSelectedWorkspace(workspace);
  }

  return (
    <Menu shadow="md">
      <Menu.Target>
        <UnstyledButton className={classes.workspaceSwitcher}>
          <Group>
            <Avatar radius="xl">
              {selectedWorkspace?.name.charAt(0).toUpperCase()}
            </Avatar>

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {selectedWorkspace?.name}
              </Text>

              <Text color="dimmed" size="xs"></Text>
            </div>

            <IconSelector size="0.9rem" stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown mah="300px" sx={{ overflowY: "auto" }}>
        <Menu.Label>Espacios de trabajo</Menu.Label>
        {workspacesQuery.data?.map((workspace) => (
          <Link
            key={workspace.id}
            href={DASHBOARD_PAGE(workspace.id).path}
            legacyBehavior
            passHref
          >
            <Menu.Item
              component="a"
              onClick={() => selectWorkspace(workspace)}
              className={
                selectedWorkspace?.id === workspace.id ? classes.menuActive : ""
              }
              icon={
                <Avatar radius="xl" size="sm">
                  {workspace.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              rightSection={
                selectedWorkspace?.id === workspace.id && (
                  <IconCheck size="0.9rem" stroke={1.5} />
                )
              }
            >
              {workspace.name}
            </Menu.Item>
          </Link>
        ))}

        <Menu.Divider />

        <Link href={CREATE_WORKSPACE_PAGE.path} legacyBehavior passHref>
          <Menu.Item
            component="a"
            sx={{ ":hover": { backgroundColor: "transparent" } }}
          >
            <Button variant="default">Crear espacio de trabajo</Button>
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}
