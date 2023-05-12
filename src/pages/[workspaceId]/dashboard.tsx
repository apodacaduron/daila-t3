import { type CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import { CREATE_WORKSPACE_PAGE, SIGN_IN_PAGE } from "~/data/routes";
import { prisma } from "~/server/db";

export default function DashboardPage() {
  return <div>Dashboard</div>;
}

export async function getServerSideProps(context: CtxOrReq) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: SIGN_IN_PAGE.path },
    };
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      createdById: session.user.id,
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
