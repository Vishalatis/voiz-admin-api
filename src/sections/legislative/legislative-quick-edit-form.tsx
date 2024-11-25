import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'; // Import your adapter here
import { Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { ministry } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { ILegislativeItem } from 'src/types/legislative';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentLegislative?: ILegislativeItem;
};

export default function LegislativeQuickEditForm({ currentLegislative, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    ministry: Yup.string().required('Ministry is required'),
    introducedInLsRS: Yup.date().required('Introduced in LS/RS is required'),
    passedInLs: Yup.date().required('Passed in LS is required'),
    passedInRs: Yup.date().required('Passed in RS is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentLegislative?.title || '',
      ministry: currentLegislative?.ministry || '',
      introducedInLsRS: currentLegislative?.introducedInLsRS || new Date(),
      passedInLs: currentLegislative?.passedInLs || new Date(),
      passedInRs: currentLegislative?.passedInRs || new Date(),
    }),
    [currentLegislative]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {' '}
        {/* Wrap with LocalizationProvider */}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <DialogTitle>Quick Update</DialogTitle>

          <DialogContent>
            <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
              Account is waiting for confirmation
            </Alert>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="title" label="Enter Title" />
              <RHFAutocomplete
                name="ministry"
                type="ministry"
                label="Ministry"
                placeholder="Choose a Ministry"
                fullWidth
                options={ministry.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Introduced in LS/RS</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="introducedInLsRS"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Passed in LS</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="passedInLs"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Passed in RS</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="passedInRs"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Stack>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Update
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </LocalizationProvider>
    </Dialog>
  );
}
