// ----------------------------------------------------------------------

import SocialIssueDetailsView from 'src/sections/issue/details/social-details';

export const metadata = {
  title: 'Dashboard: Social Issue',
};

// ----------------------------------------------------------------------

type Props = {
  params: { id: string };
};
export default function InquiryDetailsPage({ params }: Props) {
  const { id } = params;

  return <SocialIssueDetailsView id={id} />;
}
