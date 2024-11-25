import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { IVotersItem } from 'src/types/voters';

import VotersSummaryItem from './voters-item';

// ----------------------------------------------------------------------

type Props = {
  voters: IVotersItem[];
};

export default function VotersSummaryList({ voters }: Props) {
  const router = useRouter();

  const handleView = useCallback(
    (id: string) => {
      router.push(paths.dashboard.votersSummary.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.votersSummary.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {voters.map((vote) => (
          <VotersSummaryItem
            key={vote.id}
            voters={vote}
            onView={() => handleView(vote.id)}
            onEdit={() => handleEdit(vote.id)}
            onDelete={() => handleDelete(vote.id)}
          />
        ))}
      </Box>

      {voters.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
