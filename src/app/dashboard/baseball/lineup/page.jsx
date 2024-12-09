import { CONFIG } from 'src/config-global';

import { PlayersLineupView } from 'src/sections/Baseball/view/players-lineup-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PlayersLineupView />;
}
