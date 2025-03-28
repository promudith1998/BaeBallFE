import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------
// Data Grid Configuration (moved above components that use it)
const dataGridRows = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
  },
];

const dataGridColumns = [
  {
    field: 'treeView',
    headerName: 'Permissions',
    width: 300,
    renderCell: () => <BasicSimpleTree />,
  },
];

// ----------------------------------------------------------------------
// Validation Schema (updated with username)
export const NewUserSchema = zod.object({
  avatarUrl: schemaHelper.file({
    message: { required_error: 'Avatar is required!' },
  }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  userName: zod.string().min(1, { message: 'Username is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
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
// Main Form Component
export function UserNewEditForm({ currentUser }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      status: currentUser?.status || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      name: currentUser?.name || '',
      userName: currentUser?.userName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      address: currentUser?.address || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      role: currentUser?.role || '',
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
          <Field.Text name="name" label="Full name" />
          <Field.Text name="userName" label="Username" />
          <Field.Text name="email" label="Email address" />
          <Field.CountrySelect
            fullWidth
            name="country"
            label="Country"
            placeholder="Choose a country"
          />
          <Field.Text name="state" label="State/region" />
          <Field.Text name="city" label="City" />
          <Field.Text name="address" label="Address" />
          <Field.Text name="zipCode" label="Zip/code" />
          <Field.Text name="company" label="Company" />
          <Field.Text name="role" label="Role" />
        </Box>

        <Box sx={{ height: 400, width: '100%', mt: 3 }}>
          <DataGrid rows={dataGridRows} columns={dataGridColumns} pageSizeOptions={[5]} />
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentUser ? 'Create User' : 'Save Changes'}
          </LoadingButton>
          <LoadingButton variant="outlined" onClick={() => router.push(paths.dashboard.user.list)}>
            Cancel
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}

// ----------------------------------------------------------------------
// Tree View Component
function BasicSimpleTree() {
  return (
    <SimpleTreeView sx={{ overflowX: 'hidden', minHeight: 100, width: 1 }}>
      <TreeItem itemId="grid" label="Data Grid">
        <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
        <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
        <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
      </TreeItem>
      <TreeItem itemId="pickers" label="Date and Time Pickers">
        <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
        <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
      </TreeItem>
    </SimpleTreeView>
  );
}

// ----------------------------------------------------------------------
// Additional Component (if needed)
export function UserDataGrid() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={dataGridRows} columns={dataGridColumns} />
      </Box>
    </Card>
  );
}
