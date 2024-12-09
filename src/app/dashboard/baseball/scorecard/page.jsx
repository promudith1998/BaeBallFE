import { CONFIG } from 'src/config-global';

import { ScorecardView } from 'src/sections/Baseball/view/players-scorecard-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ScorecardView />;
}
