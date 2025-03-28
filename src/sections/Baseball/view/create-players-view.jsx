'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreatePlayers } from '../create_Players';

// ----------------------------------------------------------------------

export function CreatePlayersView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create Players"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Baseball', href: paths.dashboard.baseball.root },
          { name: 'Create Players' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CreatePlayers />
    </DashboardContent>
  );
}
