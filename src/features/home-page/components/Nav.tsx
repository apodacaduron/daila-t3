import { Button, Container, Group, createStyles } from '@mantine/core'
import Image from 'next/image'
import { DAILA_BLACK_LOGO } from '~/data/assets'

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
            <Button variant="default">Iniciar sesión</Button>
            <Button>Regístrate</Button>
          </Group>
        </Group>
      </Container>
    </nav>
  )
}
