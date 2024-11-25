'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CaseNewEditForm from '../case-new-edit-form';

// ----------------------------------------------------------------------

export default function PostCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Case Journey Tracker"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Case Journey Tracker',
            href: paths.dashboard.caseJourneyTracker.root,
          },
          {
            name: 'Create Case Journey Tracker',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CaseNewEditForm />
    </Container>
  );
}
