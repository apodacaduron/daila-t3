import {
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Container,
  Center,
  Anchor,
} from "@mantine/core";
import { type CtxOrReq } from "next-auth/client/_utils";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { DAILA_ICON_LOGO, GOOGLE_ICON_LOGO } from "~/data/assets";
import { HOME_PAGE, SIGN_IN_PAGE } from "~/data/routes";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign up - Daila</title>
      </Head>
      <Center w="100%" h="100vh">
        <Container size={360}>
          <Stack align="center">
            <Image {...DAILA_ICON_LOGO} alt={DAILA_ICON_LOGO.alt} />
            <Title order={2}>Crea tu cuenta</Title>
            <Text color="dimmed" align="center">
              Comienza a convertir tus ideas en realidad.
            </Text>
            <TextInput
              w="100%"
              label="Correo electrónico"
              placeholder="Ingresa tu correo"
              withAsterisk
            />
            <TextInput
              w="100%"
              label="Contraseña"
              placeholder="Crea una contraseña"
              withAsterisk
            />
            <TextInput
              w="100%"
              label="Confirmar contraseña"
              placeholder="Reingresa tu contraseña"
              withAsterisk
            />
            <Button fullWidth>Crear cuenta</Button>
            <Button
              fullWidth
              variant="default"
              leftIcon={
                <Image {...GOOGLE_ICON_LOGO} alt={GOOGLE_ICON_LOGO.alt} />
              }
              onClick={() => signIn("google")}
            >
              Regístrate con Google
            </Button>
            <Text color="dimmed">
              ¿Ya tienes una cuenta? &nbsp;
              <Link href={SIGN_IN_PAGE.path} legacyBehavior passHref>
                <Anchor>Inicia sesión</Anchor>
              </Link>
            </Text>
          </Stack>
        </Container>
      </Center>
    </>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: HOME_PAGE.path },
    };
  }

  return {
    props: {},
  };
}
