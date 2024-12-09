import { CONFIG } from 'src/config-global';

import { PlayersDugoutView } from 'src/sections/Baseball/view/players-dugout-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PlayersDugoutView />;
}
