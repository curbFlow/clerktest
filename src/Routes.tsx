import { ClerkProvider, SignIn, SignUp, useUser } from "@clerk/clerk-react";
import {
  Outlet,
  ReactLocation,
  Router,
  useNavigate,
} from "@tanstack/react-location";
import React, { useEffect } from "react";

import { Box, Center } from "@mantine/core";
import NotFound from "./pages/NotFound";
import { Page1 } from "./pages/Page1";
import { useClerkUrls } from "./utils/useClerkUrls";

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
          path: "/sign-up",
          element: <SignUpView />,
        },
        {
          path: "/sign-in",
          element: <SignInView />,
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
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("require auth effect: ", { isLoaded, isSignedIn });
    if (isLoaded && !isSignedIn) {
      navigate({ to: "/sign-in" });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (isLoaded && isSignedIn) {
    return <div>{children}</div>;
  } else {
    return null;
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
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: "/" });
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <Box mt="md">
      <Center>
        <p>Version: 20</p>
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
