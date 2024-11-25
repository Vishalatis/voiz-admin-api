'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DailyNewsNewEditForm from '../public-poll-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PublicPollEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { product: currentDailyNews } = useGetProduct(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Public Poll Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Public Poll',
            href: paths.dashboard.publicPoll.root,
          },
          { name: currentDailyNews?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DailyNewsNewEditForm  />
    </Container>
  );
}
