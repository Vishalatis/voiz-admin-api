'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LegislativeNewEditForm from '../legislative-new-edit-form';

// ----------------------------------------------------------------------

export default function CreateLegislative() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Legislative"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Legislative',
            href: paths.dashboard.LegislativeUpdates.root,
          },
          { name: 'New Legislative' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LegislativeNewEditForm />
    </Container>
  );
}
