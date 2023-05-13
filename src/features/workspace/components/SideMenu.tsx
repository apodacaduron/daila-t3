import { Flex, createStyles } from "@mantine/core";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const useStyles = createStyles((theme) => ({
  sideMenu: {
    padding: theme.spacing.xs,
    height: "100vh",
    flexDirection: "column",
    borderRight: "1px solid",
    borderColor: theme.colors.gray[2],
  },
}));

export default function SideMenu() {
  const { classes } = useStyles();
  return (
    <Flex className={classes.sideMenu}>
      <WorkspaceSwitcher />
    </Flex>
  );
}
