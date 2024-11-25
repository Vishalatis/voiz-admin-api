'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AccessManagementNewEditForm from '../accessManagement-new-edit-form';

// ----------------------------------------------------------------------

export default function CreateAccessManagementView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Access"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Access Management',
            href: paths.dashboard.accessManagement.root,
          },
          { name: 'New Access Management' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccessManagementNewEditForm />
    </Container>
  );
}
