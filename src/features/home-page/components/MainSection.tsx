import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Container,
  Center,
  createStyles,
} from '@mantine/core'
import Image from 'next/image'
import { DAILA_PREVIEW } from '~/data/assets'

const useStyles = createStyles((theme) => ({
  section: {
    backgroundColor: theme.colors.blue[0],
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    paddingTop: '72px',
  },
  mainTextContainer: {
    textAlign: 'center',
  },
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    [theme.fn.smallerThan('lg')]: {
      alignItems: 'flex-start',
    },
    zIndex: 1,
  },
  title: {
    fontFamily: 'Yeseva One',
    fontSize: '72px',
    lineHeight: '72px',
    letterSpacing: '-4px',
    fontWeight: 400,
    [theme.fn.smallerThan('sm')]: {
      fontSize: '48px',
      lineHeight: '48px',
      letterSpacing: '-2px',
    },
    [theme.fn.smallerThan('xs')]: {
      fontSize: '32px',
      lineHeight: '32px',
      letterSpacing: '-1px',
    },
  },
  subtitle: {
    fontSize: '20px',
    [theme.fn.smallerThan('sm')]: {
      fontSize: '16px',
    },
  },
  shapes: {
    position: 'absolute',
    borderRadius: '100%',
  },
  leftCircle: {
    backgroundColor: theme.colors.blue[6],
    height: '500px',
    width: '500px',
    bottom: '-250px',
    left: '-250px',
  },
  rightCircle: {
    backgroundColor: theme.colors.orange[3],
    height: '700px',
    width: '700px',
    bottom: '0px',
    right: '-350px',
    [theme.fn.smallerThan('sm')]: {
      right: '-550px',
    },
  },
}))

export default function MainSection() {
  const { classes } = useStyles()
  return (
    <section className={classes.section}>
      <Container size="xl" h="100%">
        <Center h="100%">
          <Stack className={classes.mainContainer}>
            <Stack
              className={classes.mainTextContainer}
              align="center"
              justify="center"
              h="100%"
              w="100%"
              spacing="xs"
            >
              <Title className={classes.title}>
                Administra a tus <br /> pacientes en equipo.
              </Title>
              <Text className={classes.subtitle} color="dimmed">
                Nuestro software te proporciona todas las herramientras <br />{' '}
                para administrar a tus pacientes online.
              </Text>
              <Group mt="lg">
                <Button size="lg">Comenzar ahora</Button>
                <Button size="lg" variant="default">
                  Demo
                </Button>
              </Group>
            </Stack>
            <Image {...DAILA_PREVIEW} alt={DAILA_PREVIEW.alt} />
          </Stack>
        </Center>
      </Container>
      <div className={`${classes.shapes} ${classes.leftCircle}`}></div>
      <div className={`${classes.shapes} ${classes.rightCircle}`}></div>
    </section>
  )
}
