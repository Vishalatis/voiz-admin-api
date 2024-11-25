'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetPost } from 'src/api/blog';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SchemeNewEditForm from '../scheme-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  title: string;
};

export default function SchemeEditView({ title }: Props) {
  const settings = useSettingsContext();

  const { post: currentPost } = useGetPost(title);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Scheme Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Scheme',
            href: paths.dashboard.scheme.root,
          },
          {
            name: currentPost?.title,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SchemeNewEditForm currentPost={currentPost} />
    </Container>
  );
}
