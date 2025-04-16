import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import UserViewList from './userviewlist';
import axios, { endpoints } from '../../utils/axios';

// ------------------------------------------------------------

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
  isVerified: zod.boolean(),
});

// ------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const open = useBoolean(); // FIX: manage modal open state

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  // const allUsers = []; // Should fetch or receive from parent
  // const selectedUserData = null; // Same as above
  const emptyValues = {
    name: '',
    userName: '',
    email: '',
    phoneNumber: '',
    country: null,
    address: '',
    company: '',
    state: '',
    city: '',
    role: '',
    zipCode: '',
    isVerified: true,
  };

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
      const payload = {
        createdByUser: 1,
        newUser: 0,
        header: data,
        line: [
          { MenuID: 1000, Actions: 1 },
          { MenuID: 2000, Actions: 2 },
        ],
      };

      const response = await axios.post(endpoints.user.create, payload);
      await new Promise((resolve) => setTimeout(resolve, 500));

      reset();
      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred while submitting the form.');
    }
  });

  const meals = [
    /* your meal data remains unchanged */
  ];
  const clearHandler = () => {
    reset(emptyValues);
  };
  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.user.list); // ✅ Adjust this endpoint
      setAllUsers(response.data); // Assume data is the array of users
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users.');
    }
  }, []);

  // ✅ Load users when modal opens
  useEffect(() => {
    if (open.value) {
      fetchAllUsers();
    }
  }, [open.value, fetchAllUsers]);
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
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
        {/*
        <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Menu</TableCell>
                  <TableCell>Authorization</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((row) => (
                  <MealCategory key={row.AutoID} row={row} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer> */}

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentUser ? 'Save Changes' : 'Create User'}
          </LoadingButton>
          <LoadingButton variant="outlined" onClick={clearHandler}>
            Clear
          </LoadingButton>
          <LoadingButton variant="contained" onClick={open.onTrue}>
            View All Users
          </LoadingButton>
        </Stack>
      </Card>

      {open.value && (
        <UserViewList
          open={open.value}
          close={open.onFalse}
          users={allUsers}
          selectedUser={selectedUserData}
        />
      )}
    </Form>
  );
}

// ------------------------------------------------------------

function MealCategory({ row }) {
  const collapsible = useBoolean();

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: 0 }}>
          <IconButton
            size="small"
            color={collapsible.value ? 'inherit' : 'default'}
            onClick={collapsible.onToggle}
          >
            <Iconify
              icon={collapsible.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </IconButton>
        </TableCell>
        <TableCell>{row.Menu}</TableCell>
        <TableCell>{row.Category}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={7}>
          <Collapse in={collapsible.value} unmountOnExit>
            <Paper variant="outlined" sx={{ py: 2, borderRadius: 1.5 }}>
              <Table sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Menu</TableCell>
                    <TableCell>Authorization</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Stages.map((stage, index) => (
                    <TableRow key={index}>
                      <TableCell>{stage.StageName}</TableCell>
                      <TableCell>{stage.EstimatedTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
