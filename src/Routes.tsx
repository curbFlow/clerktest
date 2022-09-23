import { ClerkProvider, SignIn, SignUp, UserProfile } from "@clerk/clerk-react";
import {
  ReactLocation,
  Router,
  Outlet,
  useNavigate,
} from "@tanstack/react-location";
import React, { useEffect } from "react";

import { Box, Center } from "@mantine/core";
import NotAuthorized from "./pages/NotAuthorized";
import NotFound from "./pages/NotFound";
import { useClerkUrls } from "./utils/useClerkUrls";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { useUserPermissions } from "./utils/useUserPermissions";

const frontendApi = getFrontendApi();

function getFrontendApi() {
  if (window.location.host.startsWith("localhost")) {
    return "clerk.settled.grub-39.lcl.dev";
  } else {
    return "clerk.curbflow.com";
  }
}

const location = new ReactLocation();

type Props = {
  header: React.ReactNode;
};

export function Routes({ header }: Props) {
  return (
    <Router
      location={location}
      routes={[
        {
          path: "/",
          element: (
            <RequireAuth>
              <Page1 />
            </RequireAuth>
          ),
        },
        {
          path: "/page2",
          element: (
            <RequireAuth>
              <Page2 />
            </RequireAuth>
          ),
        },
        {
          path: "/sign-up",
          element: <SignUpView />,
        },
        {
          path: "/sign-in",
          element: <SignInView />,
        },
        {
          path: "/user",
          element: <UserProfileView />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]}
    >
      <ClerkAuthProvider>
        {header}
        <Outlet />
      </ClerkAuthProvider>
    </Router>
  );
}

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUserPermissions();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("require auth effect: ", { isLoaded, isSignedIn });
    if (isLoaded && !isSignedIn) {
      navigate({ to: "/sign-in" });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (isLoaded && isSignedIn) {
    return <RequireRole>{children}</RequireRole>;
  } else {
    return null;
  }
};

const RequireRole = ({ children }: { children: React.ReactNode }) => {
  const { userHasRole } = useUserPermissions();

  if (userHasRole) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return <NotAuthorized />;
  }
};

const ClerkAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      frontendApi={frontendApi}
      navigate={(val) => {
        console.log("custom navigate fn called with: ", val);
        navigate({ to: val });
      }}
    >
      {children}
    </ClerkProvider>
  );
};

const SignInView = () => {
  const urls = useClerkUrls();
  const { isLoaded, isSignedIn } = useUserPermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: "/" });
    }
  }, [isLoaded, isSignedIn, navigate]);
  console.log("rendering sign in wit v1: ", urls);

  return (
    <Box mt="md">
      <Center>
        <SignIn
          path="/sign-in"
          routing="path"
          redirectUrl={urls.redirectUrl}
          signUpUrl={urls.signUpUrl}
        />
      </Center>
    </Box>
  );
};

const SignUpView = () => {
  const urls = useClerkUrls();
  console.log("rendering sign up with: ", urls);
  return (
    <Box mt="md">
      <Center>
        <SignUp
          path="/sign-up"
          routing="path"
          redirectUrl={urls.redirectUrl}
          signInUrl={urls.signInUrl}
        />
      </Center>
    </Box>
  );
};

const UserProfileView = () => {
  return (
    <RequireAuth>
      <UserProfile />
    </RequireAuth>
  );
};
