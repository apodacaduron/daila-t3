import {
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Container,
  Group,
  Center,
  Anchor,
} from "@mantine/core";
import { type CtxOrReq } from "next-auth/client/_utils";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { DAILA_ICON_LOGO, GOOGLE_ICON_LOGO } from "~/data/assets";
import { HOME_PAGE, SIGN_UP_PAGE } from "~/data/routes";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign in - Daila</title>
      </Head>
      <Center w="100%" h="100vh">
        <Container size={360}>
          <Stack align="center">
            <Image {...DAILA_ICON_LOGO} alt={DAILA_ICON_LOGO.alt} />
            <Title order={2}>Log in to your account</Title>
            <Text color="dimmed">Welcome back! Please enter your details.</Text>
            <TextInput
              w="100%"
              label="Correo electrónico"
              placeholder="Ingresa tu correo"
            />
            <TextInput
              w="100%"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
            />
            <Group w="100%" position="right">
              <Link href={SIGN_UP_PAGE.path} legacyBehavior passHref>
                <Anchor>Forgot password</Anchor>
              </Link>
            </Group>
            <Button fullWidth>Sign in</Button>
            <Button
              fullWidth
              variant="default"
              leftIcon={
                <Image {...GOOGLE_ICON_LOGO} alt={GOOGLE_ICON_LOGO.alt} />
              }
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
            <Text color="dimmed">
              Don&apos;t have an account? &nbsp;
              <Link href={SIGN_UP_PAGE.path} legacyBehavior passHref>
                <Anchor>Sign up</Anchor>
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
