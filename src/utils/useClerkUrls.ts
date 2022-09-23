export const useClerkUrls = () => {
  const origin = window.location.origin;
  return {
    origin: origin,
    signInUrl: `${origin}/sign-in`,
    signUpUrl: `${origin}/sign-up`,
    userProfile: `${origin}/user`,
    redirectUrl: `${origin}/`,
  };
};
