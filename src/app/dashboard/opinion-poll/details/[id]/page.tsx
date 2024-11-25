// ----------------------------------------------------------------------

import OpinionPollDetailsView from 'src/sections/opinionPoll/details/opinion-details';

export const metadata = {
  title: 'Dashboard: Opinion Poll ',
};

// ----------------------------------------------------------------------

type Props = {
  params: { id: string };
};
export default function InquiryDetailsPage({ params }: Props) {
  const { id } = params;

  return <OpinionPollDetailsView id={id} />;
}
