import { Box, Center, createStyles, Title } from "@mantine/core";

type NotAuthorizedProps = {};

const useStyles = createStyles((theme) => {
  return {
    title: {
      textTransform: "capitalize",
      marginTop: theme.spacing.xl,
      fontWeight: "bold",
    },
  };
});

export function NotAuthorized(props: NotAuthorizedProps) {
  const styles = useStyles();
  return (
    <Box mt="md">
      <Center>
        <Title className={styles.classes.title}>
          You Are Not Authorized To View This Page
        </Title>
      </Center>
    </Box>
  );
}

export default NotAuthorized;
