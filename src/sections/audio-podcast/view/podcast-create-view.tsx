'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PodcastNewEditForm from '../podcast-new-edit-form';

// ----------------------------------------------------------------------

export default function PodcastCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Audio Podcast"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Audio Podcast',
            href: paths.dashboard.podcast.root,
          },
          { name: 'New Audio Podcast' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PodcastNewEditForm />
    </Container>
  );
}
