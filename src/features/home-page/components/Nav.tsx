import { Button, Container, Group, Loader, createStyles } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DAILA_BLACK_LOGO } from "~/data/assets";
import {
  CREATE_WORKSPACE_PAGE,
  DASHBOARD_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
} from "~/data/routes";
import { api } from "~/utils/api";

const useStyles = createStyles(() => ({
  nav: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    height: "72px",
  },
}));

export default function Nav() {
  const { classes } = useStyles();
  const session = useSession();
  const activeWorkspaceQuery = api.member.workspace.useQuery(undefined, {
    enabled: Boolean(session.data),
  });

  const unauthenticatedButtons = (
    <>
      <Link href={SIGN_IN_PAGE.path}>
        <Button variant="default">Iniciar sesión</Button>
      </Link>
      <Link href={SIGN_UP_PAGE.path}>
        <Button>Regístrate</Button>
      </Link>
    </>
  );

  const authenticatedButtons = (
    <>
      {getActionButton()}
      <Button onClick={() => signOut()}>Cerrar sesión</Button>
    </>
  );

  function getActionButton() {
    if (activeWorkspaceQuery.isFetching) {
      return <Loader size="sm" />;
    }
    if (!activeWorkspaceQuery.data) {
      return (
        <Link href={CREATE_WORKSPACE_PAGE.path}>
          <Button variant="default">Crear espacio de trabajo</Button>
        </Link>
      );
    }
    return (
      <Link href={DASHBOARD_PAGE(activeWorkspaceQuery.data.id).path}>
        <Button variant="default">Dashboard</Button>
      </Link>
    );
  }

  return (
    <nav className={classes.nav}>
      <Container size="xl" className={classes.navContainer}>
        <Group position="apart" w="100%">
          <Image {...DAILA_BLACK_LOGO} alt={DAILA_BLACK_LOGO.alt} />
          <Group>
            {session.data ? authenticatedButtons : unauthenticatedButtons}
          </Group>
        </Group>
      </Container>
    </nav>
  );
}
