import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ministry } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { ILegislativeItem } from 'src/types/legislative';

// ----------------------------------------------------------------------

type Props = {
  currentLegislative?: ILegislativeItem;
};

export default function LegislativeNewEditForm({ currentLegislative }: Props) {
  const router = useRouter();

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
      enqueueSnackbar(currentLegislative ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.LegislativeUpdates.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
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

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentLegislative ? 'Create Legislative' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </LocalizationProvider>
  );
}
