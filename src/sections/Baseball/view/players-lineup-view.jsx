'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../players_lineup';

// ----------------------------------------------------------------------

export function PlayersLineupView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Lineup"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Baseball', href: paths.dashboard.baseball.root },
          { name: 'Players Lineup' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm />
    </DashboardContent>
  );
}
