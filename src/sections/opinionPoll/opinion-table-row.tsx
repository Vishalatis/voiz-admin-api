/* eslint-disable no-nested-ternary */

import Image from 'next/image';

import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GridCellParams } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

import { fTime, fDate } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellRegion({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image alt={params.row.img} src={params.row.img} width={50} height={50} />
        <Typography sx={{ ml: 2 }}>{params.row.region}</Typography>
      </Box>
    </Stack>
  );
}

export function RenderCellVotingCount({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      <Label variant="soft" color="success">
        {params.row.votingCount}
      </Label>
    </Stack>
  );
}

export function RenderCellDesc({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      <Typography sx={{ ml: 2 }}>{params.row.desc.slice(0, 100)}...</Typography>
    </Stack>
  );
}

export function RenderCellPublishedDate({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 3, width: 1 }}>
      <ListItemText
        primary={fDate(params.row.publishedDate)}
        secondary={fTime(params.row.publishedDate)}
        primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: 'span',
          typography: 'caption',
        }}
      />
    </Stack>
  );
}
