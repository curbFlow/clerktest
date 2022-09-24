import { useUser } from "@clerk/clerk-react";
import {
  Outlet,
  ReactLocation,
  Router,
  useNavigate,
} from "@tanstack/react-location";
import React, { useEffect } from "react";
import { ClerkAuthProvider, SignInView, SignUpView } from "./Components";

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

function NotFound() {
  return (
    <div>
      <p>Page Not Found</p>
    </div>
  );
}

const Page1 = () => {
  return <h1>Page 1</h1>;
};
