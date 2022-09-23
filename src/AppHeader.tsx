import { UserButton, useUser } from "@clerk/clerk-react";
import { Grid, Group, Header, Title } from "@mantine/core";
import { Link } from "@tanstack/react-location";
import { useClerkUrls } from "./utils/useClerkUrls";

export function AppHeader() {
  const { isSignedIn } = useUser();
  const urls = useClerkUrls();

  return (
    <Header height={50}>
      <Grid>
        <Grid.Col span={4}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title order={3}>Clerk Test App</Title>
          </Link>
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          {isSignedIn && (
            <Group position="right">
              <UserButton
                showName
                afterSignOutUrl={urls.signInUrl}
                afterMultiSessionSingleSignOutUrl={urls.signInUrl}
                afterSwitchSessionUrl={urls.signInUrl}
                signInUrl={urls.signInUrl}
                userProfileMode="modal"
                userProfileUrl={urls.userProfile}
              />
            </Group>
          )}
        </Grid.Col>
      </Grid>
    </Header>
  );
}
