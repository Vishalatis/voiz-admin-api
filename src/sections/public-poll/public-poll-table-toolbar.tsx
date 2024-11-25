import { useState, useCallback } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { INewsTableFilters, INewsTableFilterValue } from 'src/types/news';

// ----------------------------------------------------------------------

type Props = {
  filters: INewsTableFilters;
  onFilters: (name: string, value: INewsTableFilterValue) => void;

  publishOptions: {
    value: string;
    label: string;
  }[];
};

export default function PublicPollTableToolbar({
  filters,
  onFilters,

  publishOptions,
}: Props) {
  const popover = usePopover();

  const [publish, setPublish] = useState<string[]>(filters.publish);

  const handleChangePublish = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPublish(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleClosePublish = useCallback(() => {
    onFilters('publish', publish);
  }, [onFilters, publish]);

  return (
    <>
      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>Status</InputLabel>

        <Select
          multiple
          value={publish}
          onChange={handleChangePublish}
          input={<OutlinedInput label="Publish" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          onClose={handleClosePublish}
          sx={{ textTransform: 'capitalize' }}
        >
          {publishOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox disableRipple size="small" checked={publish.includes(option.value)} />
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
