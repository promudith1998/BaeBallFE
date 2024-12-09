import { CONFIG } from 'src/config-global';

import { StatisticsView } from 'src/sections/Baseball/view/players-stats-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <StatisticsView />;
}
