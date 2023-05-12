import {
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Container,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DASHBOARD_PAGE, SIGN_IN_PAGE } from "~/data/routes";
import { api } from "~/utils/api";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const createWorkspaceMutation = api.workspace.create.useMutation({
    async onSuccess(newWorkspace) {
      await router.push(DASHBOARD_PAGE(newWorkspace.id).path);
    },
  });
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        Boolean(value)
          ? null
          : "Por favor asigna un nombre a tu espacio de trabajo",
    },
  });

  async function createWorkspace(values: typeof form.values) {
    await createWorkspaceMutation.mutateAsync(values);
  }

  return (
    <>
      <Head>
        <title>Create workspace - Daila</title>
      </Head>
      <Center w="100%" h="100vh">
        <Container size={360}>
          <form onSubmit={form.onSubmit(createWorkspace)}>
            <Stack align="center" spacing="xl">
              <Stack spacing={0}>
                <Title order={2}>Crea un espacio de trabajo</Title>
                <Text color="dimmed" align="center">
                  Despues de crear un espacio de trabajo puedes invitar a otros
                  a unirse
                </Text>
              </Stack>
              <TextInput
                w="100%"
                label="Nombre de espacio de trabajo"
                placeholder="Ingresa el nombre de tu espacio de trabajo"
                withAsterisk
                {...form.getInputProps("name")}
              />
              <Button fullWidth type="submit">
                Crear espacio de trabajo
              </Button>
            </Stack>
          </form>
        </Container>
      </Center>
    </>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: SIGN_IN_PAGE.path },
    };
  }

  return {
    props: {},
  };
}
