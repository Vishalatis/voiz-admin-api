/* eslint-disable no-nested-ternary */
import Image from 'next/image';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GridCellParams } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

import { fTime, fDate } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellName({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Image 
        alt={params.row.title} 
        src={params.row.postImg} 
        width={50} 
        height={50} 
      />
      <ListItemText
        disableTypography
        primary={
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={params.row.onViewRow}
            sx={{ cursor: 'pointer' }}
          >
            {params.row.title}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}
      />
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

export function RenderCellTitle({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      {params.row.title.split(' ').slice(0, 5).join(' ')}
    </Stack>
  );
}

export function RenderCellLocation({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      <Label variant="soft" color="success">
        {params.row.location}
      </Label>
    </Stack>
  );
}

export function RenderCellViews({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      {params.row.views}
    </Stack>
  );
}

export function RenderCellLike({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      {params.row.likes}
    </Stack>
  );
}

export function RenderCellComments({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      {params.row.comments}
    </Stack>
  );
}

export function RenderCellShare({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ py: 3, width: 1 }}>
      {params.row.share}
    </Stack>
  );
}
