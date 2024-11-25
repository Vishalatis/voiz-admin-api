'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VotersSummaryNewEditForm from '../voters-new-edit-form';

// ----------------------------------------------------------------------

export default function VotersSummaryCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create  Voters Summary"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Voters Summary',
            href: paths.dashboard.votersSummary.root,
          },
          { name: 'New Voters Summary' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VotersSummaryNewEditForm />
    </Container>
  );
}
