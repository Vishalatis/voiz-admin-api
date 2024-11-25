import { _jobs } from 'src/_mock/_job';

import { PodcastEditView } from 'src/sections/audio-podcast/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Audio Podcast Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default function JobEditPage({ params }: Props) {
  const { id } = params;

  return <PodcastEditView id={id} />;
}

export async function generateStaticParams() {
  return _jobs.map((job) => ({
    id: job.id,
  }));
}
