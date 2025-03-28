import { CONFIG } from 'src/config-global';

import { CreateTeamView } from 'src/sections/Baseball/view/create-team-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new Team | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CreateTeamView />;
}
