import { CONFIG } from 'src/config-global';

import { ResultsView } from 'src/sections/Baseball/view/players-results-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ResultsView />;
}
