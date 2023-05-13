import { Flex } from "@mantine/core";
import { SideMenu } from "../components";

type Props = {
  children: React.ReactNode;
};
export default function WorkspaceLayout(props: Props) {
  return (
    <Flex>
      <SideMenu />
      {props.children}
    </Flex>
  );
}
