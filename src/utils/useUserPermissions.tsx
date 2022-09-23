import { useUser } from "@clerk/clerk-react";
import { useCallback } from "react";

const noRides = [] as string[];
export const useUserPermissions = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const publicMetadata = user?.publicMetadata["clerkTest"] || ({} as any);
  const userRole = (publicMetadata["role"] as string) || "";
  const userHasRole = ["admin", "viewer"].includes(userRole.toLowerCase());

  return {
    user,
    userRole,
    userHasRole,
    isSignedIn,
    isLoaded,
  } as const;
};
