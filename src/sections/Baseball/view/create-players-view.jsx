'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreateTeamPlayers } from '../create_team_players';

// ----------------------------------------------------------------------

export function CreatePlayersView() {
  return (
    <DashboardContent>
      <div>FUCK</div>
      {/* <CustomBreadcrumbs
        heading="Create Players"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Baseball', href: paths.dashboard.baseball.root },
          { name: 'Create Players' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CreateTeamPlayers /> */}
    </DashboardContent>
  );
}
