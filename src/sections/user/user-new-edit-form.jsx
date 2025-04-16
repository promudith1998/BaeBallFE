import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
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
  // status: zod.string(),
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
      // status: currentUser?.status || '',
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
  const meals = [
    {
      AutoID: 1,
      Menu: 'Lunch',
      Category: 'Vegetarian',
      Meal: 'Pasta Primavera',
      Quantity: '10',
      Ingredients: [
        {
          Code: 'ING001',
          Name: 'Pasta',
          Quantity: 500,
          UOM: 'g',
          AvailableQuantity: 2000,
          RequestQuantity: 500,
          IssueQuantity: 500,
        },
        {
          Code: 'ING002',
          Name: 'Tomato Sauce',
          Quantity: 300,
          UOM: 'ml',
          AvailableQuantity: 1500,
          RequestQuantity: 300,
          IssueQuantity: 300,
        },
        {
          Code: 'ING003',
          Name: 'Bell Peppers',
          Quantity: 200,
          UOM: 'g',
          AvailableQuantity: 800,
          RequestQuantity: 200,
          IssueQuantity: 200,
        },
        {
          Code: 'ING004',
          Name: 'Olive Oil',
          Quantity: 50,
          UOM: 'ml',
          AvailableQuantity: 500,
          RequestQuantity: 50,
          IssueQuantity: 50,
        },
        {
          Code: 'ING005',
          Name: 'Parmesan Cheese',
          Quantity: 100,
          UOM: 'g',
          AvailableQuantity: 400,
          RequestQuantity: 100,
          IssueQuantity: 100,
        },
      ],
      Stages: [
        {
          StageName: 'Preparation',
          EstimatedTime: '10 mins',
          StartTime: '10:00 AM',
          EndTime: '10:10 AM',
          Status: 'Completed',
        },
        {
          StageName: 'Cooking',
          EstimatedTime: '20 mins',
          StartTime: '10:10 AM',
          EndTime: '10:30 AM',
          Status: 'In Progress',
        },
        {
          StageName: 'Plating',
          EstimatedTime: '5 mins',
          StartTime: '10:30 AM',
          EndTime: '10:35 AM',
          Status: 'Pending',
        },
      ],
    },
    {
      AutoID: 2,
      Menu: 'Dinner',
      Category: 'Non-Vegetarian',
      Meal: 'Grilled Chicken',
      Quantity: '15',
      Ingredients: [
        {
          Code: 'ING006',
          Name: 'Chicken Breast',
          Quantity: 1000,
          UOM: 'g',
          AvailableQuantity: 5000,
          RequestQuantity: 1000,
          IssueQuantity: 1000,
        },
        {
          Code: 'ING007',
          Name: 'Garlic',
          Quantity: 50,
          UOM: 'g',
          AvailableQuantity: 300,
          RequestQuantity: 50,
          IssueQuantity: 50,
        },
        {
          Code: 'ING008',
          Name: 'Olive Oil',
          Quantity: 30,
          UOM: 'ml',
          AvailableQuantity: 500,
          RequestQuantity: 30,
          IssueQuantity: 30,
        },
        {
          Code: 'ING009',
          Name: 'Lemon Juice',
          Quantity: 20,
          UOM: 'ml',
          AvailableQuantity: 200,
          RequestQuantity: 20,
          IssueQuantity: 20,
        },
        {
          Code: 'ING010',
          Name: 'Salt & Pepper',
          Quantity: 10,
          UOM: 'g',
          AvailableQuantity: 100,
          RequestQuantity: 10,
          IssueQuantity: 10,
        },
      ],
      Stages: [
        {
          StageName: 'Marination',
          EstimatedTime: '15 mins',
          StartTime: '6:00 PM',
          EndTime: '6:15 PM',
          Status: 'Completed',
        },
        {
          StageName: 'Grilling',
          EstimatedTime: '25 mins',
          StartTime: '6:15 PM',
          EndTime: '6:40 PM',
          Status: 'In Progress',
        },
        {
          StageName: 'Serving',
          EstimatedTime: '5 mins',
          StartTime: '6:40 PM',
          EndTime: '6:45 PM',
          Status: 'Pending',
        },
      ],
    },
  ];
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
        <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Menu</TableCell>
                  <TableCell>Authorization</TableCell>
                  {/* <TableCell>Meal</TableCell>
                  <TableCell type="number">Quantity</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((row) => (
                  <MealCategory key={row.AutoID} row={row} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
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
        {/* <TableCell>{row.Meal}</TableCell>
        <TableCell>{row.Quantity}</TableCell> */}
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={7}>
          <Collapse in={collapsible.value} unmountOnExit>
            <Paper variant="outlined" sx={{ py: 2, borderRadius: 1.5 }}>
              {/* <Typography variant="h6" sx={{ m: 2, mt: 3 }}>
                Stages
              </Typography> */}
              <Table sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Menu</TableCell>
                    <TableCell>Authorization</TableCell>
                    {/* <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Stages.map((stage, index) => (
                    <TableRow key={index}>
                      <TableCell>{stage.StageName}</TableCell>
                      <TableCell>{stage.EstimatedTime}</TableCell>
                      {/* <TableCell>{stage.StartTime}</TableCell>
                      <TableCell>{stage.EndTime}</TableCell>
                      <TableCell>{stage.Status}</TableCell> */}
                      {/* <TableCell>
                        <IconButton>
                          <PlayArrowIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <Typography variant="h6" sx={{ m: 2, mt: 0 }}>
                Ingredients
              </Typography>
              <Table sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>UOM</TableCell>
                    <TableCell>Available Quantity</TableCell>
                    <TableCell>Request Quantity</TableCell>
                    <TableCell>Issue Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Ingredients.map((category) => (
                    <TableRow key={category.Code}>
                      <TableCell>{category.Code}</TableCell>
                      <TableCell>{category.Name}</TableCell>
                      <TableCell>{category.Quantity}</TableCell>
                      <TableCell>{category.UOM}</TableCell>
                      <TableCell>{category.AvailableQuantity}</TableCell>
                      <TableCell>{category.RequestQuantity}</TableCell>
                      <TableCell>{category.IssueQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
