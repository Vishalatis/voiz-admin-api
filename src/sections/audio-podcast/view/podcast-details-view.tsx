'use client';

import { useState, useCallback } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs, JOB_PUBLISH_OPTIONS } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import PodcastDetailsToolbar from '../podcast-details-toolbar';
import PodcastDetailsContent from '../podcast-details-content';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PodcastDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentAudio = _jobs.filter((job) => job.id === id)[0];

  const [publish, setPublish] = useState(currentAudio?.publish);

  const [currentTab] = useState('content');

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PodcastDetailsToolbar
        backLink={paths.dashboard.podcast.root}
        editLink={paths.dashboard.podcast.edit(`${currentAudio?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={JOB_PUBLISH_OPTIONS}
      />

      {currentTab === 'content' && <PodcastDetailsContent audios={{ ...currentAudio, totalVoters: '0' }} />}
    </Container>
  );
}