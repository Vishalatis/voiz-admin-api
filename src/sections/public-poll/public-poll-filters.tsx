import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';

import { INewsFilters, INewsFilterValue } from 'src/types/news';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: INewsFilters;
  onFilters: (name: string, value: INewsFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  genderOptions: {
    value: string;
    label: string;
  }[];
  categoryOptions: string[];
  ratingOptions: string[];
  colorOptions: string[];
};

export default function PublicPollFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  colorOptions,
  genderOptions,
  ratingOptions,
  categoryOptions,
}: Props) {
  return (
    <Button
      disableRipple
      color="inherit"
      endIcon={
        <Badge color="error" variant="dot" invisible={!canReset}>
          <Iconify icon="ic:round-filter-list" />
        </Badge>
      }
      onClick={onOpen}
    >
      Filters
    </Button>
  );
}

// ----------------------------------------------------------------------
