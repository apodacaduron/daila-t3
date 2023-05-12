import { Button, Container, Group, createStyles } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DAILA_BLACK_LOGO } from "~/data/assets";
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from "~/data/routes";

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
      <Link href={SIGN_IN_PAGE.path}>
        <Button variant="default">Dashboard</Button>
      </Link>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );

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
