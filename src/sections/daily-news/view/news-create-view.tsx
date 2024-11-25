'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DailyNewsNewEditForm from '../news-new-edit-form';

// ----------------------------------------------------------------------

export default function DailyNewsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Daily News"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: ' Daily News',
            href: paths.dashboard.dailyNews.root,
          },
          { name: 'New  Daily News' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DailyNewsNewEditForm currentDailyNews={null as any} />
    </Container>
  );
}
