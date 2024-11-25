import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { City, State, IState } from 'country-state-city';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';

export default function AccessManagementNewEditForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    phone: Yup.string().required('Phone is required'),
    role: Yup.string().required('Role is required'),
    state: Yup.mixed().required('State is required'),
    city: Yup.mixed().required('City is required'),
  });

  const defaultValues = {
    name: '',
    userName: '',
    password: '',
    phone: '',
    role: 'user',
    state: '',
    city: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const roleOptions = [
    'admin',
    'mla',
    'mlc',
    'mp',
    'minister',
    'corporator',
    'user',
    'media',
    'chiefminister',
  ];

  const states = State.getStatesOfCountry('IN');

  const watchedState = watch('state');

  const cities = useMemo(() => {
    const selectedState = watchedState as IState;
    return selectedState ? City.getCitiesOfState('IN', selectedState.isoCode) : [];
  }, [watchedState]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axiosInstance.post('/api/auth/signup', {
        name: data.name,
        userName: data.userName,
        password: data.password,
        phone: data.phone,
        role: data.role,
        location: (data.city as any).name,
      });

      if (response.data.success) {
        enqueueSnackbar('User created successfully!');
        router.push(paths.dashboard.accessManagement.root);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  });

  const handleStateChange = (_event: any , newValue:any) => {
    if (newValue) {
      setValue('state', newValue);
      setValue('city', '');
    }
  };

  const handleCityChange = (_event: any, newValue:any) => {
    if (newValue) {
      setValue('city', newValue);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
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
          <RHFTextField name="name" label="Full Name" />
          <RHFTextField name="userName" label="Username" />
          <RHFTextField name="phone" label="Phone Number" />
          <RHFAutocomplete
            name="role"
            label="Role"
            options={roleOptions}
            getOptionLabel={(option) => option}
          />
          <RHFAutocomplete
            name="state"
            label="State"
            options={states}
            getOptionLabel={(option) => option?.name || ''}
            onChange={handleStateChange}
            value={watch('state') || null}
          />
          <RHFAutocomplete
            name="city"
            label="City"
            options={cities}
            getOptionLabel={(option) => option?.name || ''}
            onChange={handleCityChange}
            value={watch('city') || null}
            disabled={!watch('state')}
          />
          <RHFTextField name="password" label="Password" type="password" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create User
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
