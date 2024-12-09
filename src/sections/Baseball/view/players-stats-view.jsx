'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../players_statistics';

// ----------------------------------------------------------------------

export function StatisticsView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Statistics"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Baseball', href: paths.dashboard.baseball.root },
          { name: 'Statistics' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm />
    </DashboardContent>
  );
}
