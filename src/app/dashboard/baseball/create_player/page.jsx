import { CONFIG } from 'src/config-global';

import { CreatePlayersView } from 'src/sections/Baseball/view/create-players-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new Players | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CreatePlayersView />;
}
