import {
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  Text,
  createStyles,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  accountControls: {
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
}));

export default function AccountControls() {
  const { classes } = useStyles();
  const session = useSession();
  return (
    <Menu shadow="md" position="right-end" width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.accountControls}>
          <Group>
            <Avatar radius="xl">{session.data?.user.name?.charAt(0)}</Avatar>

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500} lineClamp={1}>
                {session.data?.user.name}
              </Text>

              <Text color="dimmed" size="xs" lineClamp={1}>
                {session.data?.user.email}
              </Text>
            </div>

            <IconChevronRight size="0.9rem" stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Control de cuenta</Menu.Label>
        <Menu.Item color="red" onClick={() => signOut()}>
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
