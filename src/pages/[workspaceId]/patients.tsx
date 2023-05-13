import { type CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { type ReactElement } from "react";
import { CREATE_WORKSPACE_PAGE, SIGN_IN_PAGE } from "~/data/routes";
import { SidebarLayout } from "~/features/workspace";
import { prisma } from "~/server/db";

export default function PatientsPage() {
  return (
    <>
      <Head>
        <title>Patients - Daila</title>
      </Head>
      <div>Patients</div>
    </>
  );
}

PatientsPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

type WorkspacePageParams = {
  workspaceId: string;
};
export async function getServerSideProps(
  context: CtxOrReq & { params: WorkspacePageParams }
) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: SIGN_IN_PAGE.path },
    };
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: context.params.workspaceId ?? "",
      AND: {
        workspaceMembers: {
          some: {
            status: "ACTIVE",
            member: {
              userId: session.user.id,
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return {
      redirect: { destination: CREATE_WORKSPACE_PAGE.path },
    };
  }

  return {
    props: {},
  };
}
