import { _jobs } from 'src/_mock/_job';

import { PodcastDetailsView } from 'src/sections/audio-podcast/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Audio Podcast Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function JobDetailsPage({ params }: Props) {
  const { id } = params;

  return <PodcastDetailsView id={id} />;
}

export async function generateStaticParams() {
  return _jobs.map((job) => ({
    id: job.id,
  }));
}
