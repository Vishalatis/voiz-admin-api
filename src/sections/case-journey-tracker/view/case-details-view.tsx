'use client';

import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetPost } from 'src/api/blog';
import { POST_PUBLISH_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';

import CaseDetailsHero from '../case-details-hero';
import { CaseDetailsSkeleton } from '../case-skeleton';
import CaseDetailsToolbar from '../case-details-toolbar';

// ----------------------------------------------------------------------

type Props = {
  title: string;
};

export default function CaseDetailsView({ title }: Props) {
  const [publish, setPublish] = useState('');

  const { post, postLoading, postError } = useGetPost(title);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  useEffect(() => {
    if (post) {
      setPublish(post?.publish);
    }
  }, [post]);

  const renderSkeleton = <CaseDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${postError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = post && (
    <>
      <CaseDetailsToolbar
        backLink={paths.dashboard.caseJourneyTracker.root}
        editLink={paths.dashboard.caseJourneyTracker.root}
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={POST_PUBLISH_OPTIONS}
      />

      <CaseDetailsHero title={post.title} coverUrl={post.coverUrl} />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {post.description}
        </Typography>
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {postLoading && renderSkeleton}

      {postError && renderError}

      {post && renderPost}
    </Container>
  );
}
