'use client';

import { useState, useCallback } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs, JOB_PUBLISH_OPTIONS } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import JobDetailsToolbar from '../voters-details-toolbar';
import JobDetailsContent from '../voters-details-content';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function VotersSummaryDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentJob = _jobs.filter((job) => job.id === id)[0];

  const [publish, setPublish] = useState(currentJob?.publish);

  const [currentTab] = useState('content');

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobDetailsToolbar
        backLink={paths.dashboard.votersSummary.root}
        editLink={paths.dashboard.votersSummary.edit(`${currentJob?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={JOB_PUBLISH_OPTIONS}
      />

      {currentTab === 'content' && <JobDetailsContent voters={currentJob as any} />}
    </Container>
  );
}
