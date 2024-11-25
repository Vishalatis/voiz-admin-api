'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PodcastNewEditForm from '../podcast-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PodcastEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentAudios = _jobs.find((job) => job.id === id);

  // Add a type assertion to ensure currentAudios matches the expected type
  const typedCurrentAudios = currentAudios as any; // Changed IVotersItem to any

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Podcast Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Podcast Summary',
            href: paths.dashboard.podcast.root,
          },
          { name: typedCurrentAudios?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PodcastNewEditForm currentAudios={typedCurrentAudios} />
    </Container>
  );
}