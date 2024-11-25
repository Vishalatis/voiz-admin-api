'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PublicPollNewEditForm from '../public-poll-new-edit-form';

// ----------------------------------------------------------------------

export default function PublicPollCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Public Poll"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: ' Public Poll',
            href: paths.dashboard.dailyNews.root,
          },
          { name: 'New   Public Poll' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PublicPollNewEditForm  />
    </Container> 
  );
}