import { _jobs } from 'src/_mock/_job';

import { VotersSummaryEditView } from 'src/sections/voters-summary/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Voters Summary Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default function JobEditPage({ params }: Props) {
  const { id } = params;

  return <VotersSummaryEditView id={id} />;
}

export async function generateStaticParams() {
  return _jobs.map((job) => ({
    id: job.id,
  }));
}
