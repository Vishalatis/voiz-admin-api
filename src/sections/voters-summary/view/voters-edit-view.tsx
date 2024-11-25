'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VotersSummaryNewEditForm from '../voters-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function VotersSummaryEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentVoters = _jobs.find((job) => job.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Voters Summary Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Voters Summary',
            href: paths.dashboard.votersSummary.root,
          },
          { name: currentVoters?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VotersSummaryNewEditForm currentVoters={currentVoters as any} />
    </Container>
  );
}
