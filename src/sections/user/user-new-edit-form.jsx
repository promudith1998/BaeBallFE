import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------
// Validation Schema
export const NewUserSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  userName: zod.string().min(1, { message: 'Username is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Invalid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: schemaHelper.objectOrNull({
    message: { required_error: 'Country is required!' },
  }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  status: zod.string(),
  isVerified: zod.boolean(),
});

// ----------------------------------------------------------------------
// Main Component
export function UserNewEditForm({ currentUser }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      userName: currentUser?.userName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      country: currentUser?.country || null,
      address: currentUser?.address || '',
      company: currentUser?.company || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      role: currentUser?.role || '',
      zipCode: currentUser?.zipCode || '',
      status: currentUser?.status || '',
      isVerified: currentUser?.isVerified ?? true,
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(endpoints.user.create, data);

      await new Promise((resolve) => setTimeout(resolve, 500));

      reset();

      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred while submitting the form.');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
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
          {/* <Field.Upload name="avatarUrl" label="Avatar" /> */}
          <Field.Text name="name" label="Full Name" />
          <Field.Text name="userName" label="Username" />
          <Field.Text name="email" label="Email Address" />
          <Field.Text name="phoneNumber" label="Phone Number" />
          <Field.CountrySelect
            fullWidth
            name="country"
            label="Country"
            placeholder="Choose a country"
          />
          <Field.Text name="state" label="State/Region" />
          <Field.Text name="city" label="City" />
          <Field.Text name="address" label="Address" />
          <Field.Text name="zipCode" label="Zip Code" />
          <Field.Text name="company" label="Company" />
          <Field.Text name="role" label="Role" />
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentUser ? 'Save Changes' : 'Create User'}
          </LoadingButton>
          <LoadingButton variant="outlined" onClick={() => router.push(paths.dashboard.user.list)}>
            Cancel
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
