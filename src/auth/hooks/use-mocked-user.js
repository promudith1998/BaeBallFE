// To get the user from the <AuthContext/>, you can use

// Change:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// To:
import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const { user } = useAuthContext();

  return { user };
}
