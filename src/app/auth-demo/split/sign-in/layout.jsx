import { AuthSplitLayout } from 'src/layouts/auth-split';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <AuthSplitLayout section={{ title: 'Baseball ScoreBook' }}>{children}</AuthSplitLayout>;
}
