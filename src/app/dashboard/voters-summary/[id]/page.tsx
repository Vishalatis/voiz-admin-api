import { _jobs } from 'src/_mock/_job';

import { VotersSummaryDetailsView } from 'src/sections/voters-summary/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Voters Summary',
};

type Props = {
  params: {
    id: string;
  };
};

export default function JobDetailsPage({ params }: Props) {
  const { id } = params;

  return <VotersSummaryDetailsView id={id} />;
}

export async function generateStaticParams() {
  return _jobs.map((job) => ({
    id: job.id,
  }));
}
