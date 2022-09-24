import {
  ClerkProvider,
  SignIn,
  SignUp,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link, useNavigate } from "@tanstack/react-location";
import React, { useEffect } from "react";

const frontendApi = (function () {
  if (window.location.host.startsWith("localhost")) {
    return "clerk.settled.grub-39.lcl.dev";
  } else {
    return "clerk.curbflow.com";
  }
})();

const origin = window.location.origin;
const redirectUrl = `${origin}/`;
const signInUrl = `${origin}/sign-in`;
const signUpUrl = `${origin}/sign-up`;
const userProfileUrl = `${origin}/users`;

export const ClerkAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      frontendApi={frontendApi}
      navigate={(val) => {
        console.log("custom navigate function called with: ", val);
        navigate({ to: val });
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export function AppHeader() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Clerk Test App</h1>
      </Link>
      {isSignedIn && (
        <UserButton
          showName
          signInUrl={signInUrl}
          userProfileMode="modal"
          userProfileUrl={userProfileUrl}
        />
      )}
    </div>
  );
}

export const SignInView = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: "/" });
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div>
      <p>Version 22</p>
      <SignIn
        path="/sign-in"
        routing="path"
        redirectUrl={redirectUrl}
        signUpUrl={signUpUrl}
      />
    </div>
  );
};

export const SignUpView = () => {
  return (
    <div>
      <SignUp
        path="/sign-up"
        routing="path"
        redirectUrl={redirectUrl}
        signInUrl={signInUrl}
      />
    </div>
  );
};
