'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import InDepthCaseNewEditForm from '../inDepthCase-new-edit-form';

// ----------------------------------------------------------------------

export default function CreateInDepthCase() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create In Depth Case Study"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'In Depth Case Study',
            href: paths.dashboard.inDepthCaseStudy.root,
          },
          { name: 'New In Depth Case Study' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InDepthCaseNewEditForm />
    </Container>
  );
}
