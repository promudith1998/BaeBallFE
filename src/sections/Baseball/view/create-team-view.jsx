'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreateTeam } from '../create_team';

// ----------------------------------------------------------------------

export function CreateTeamView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create Team"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Baseball', href: paths.dashboard.baseball.root },
          { name: 'Create Team' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CreateTeam />
    </DashboardContent>
  );
}
