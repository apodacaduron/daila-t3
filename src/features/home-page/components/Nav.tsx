import { Button, Container, Group, createStyles } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { DAILA_BLACK_LOGO } from '~/data/assets'
import { SIGN_IN_PAGE } from '~/data/routes'

const useStyles = createStyles(() => ({
  nav: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '72px',
  },
}))

export default function Nav() {
  const { classes } = useStyles()
  return (
    <nav className={classes.nav}>
      <Container size="xl" className={classes.navContainer}>
        <Group position="apart" w="100%">
          <Image {...DAILA_BLACK_LOGO} alt={DAILA_BLACK_LOGO.alt} />
          <Group>
            <Link href={SIGN_IN_PAGE.path}>
              <Button variant="default">Iniciar sesión</Button>
            </Link>
            <Button>Regístrate</Button>
          </Group>
        </Group>
      </Container>
    </nav>
  )
}
