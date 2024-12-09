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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  avatarUrl: schemaHelper.file({
    message: { required_error: 'Avatar is required!' },
  }),
  name: zod.string().min(1, { message: 'Name is required!' }),
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
  // Not required
  status: zod.string(),
  isVerified: zod.boolean(),
});

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  // const [rows, setRows] = React.useState(initialRows);
  // const [rowModesModel, setRowModesModel] = React.useState({});

  const defaultValues = useMemo(
    () => ({
      status: currentUser?.status || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      name: currentUser?.name || '',
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
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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
  const teamPlayers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
  ];
  const substitutionPlayers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];

  const columns = [
    { field: 'id', headerName: 'Batting Order', width: '100' },
    { field: 'playerNo', headerName: 'Player No', type: 'number', editable: true, width: '100' },
    { field: 'playerName', headerName: 'PlayerName', editable: true, flex: 5 },
    { field: 'one', headerName: '1', type: 'number', editable: true, width: 5 },
    { field: 'two', headerName: '2', type: 'number', editable: true, width: 5 },
    { field: 'three', headerName: '3', type: 'number', editable: true, width: 5 },
    { field: 'four', headerName: '4', type: 'number', editable: true, width: 5 },
    { field: 'five', headerName: '5', type: 'number', editable: true, width: 5 },
    { field: 'six', headerName: '6', type: 'number', editable: true, width: 5 },
    { field: 'seven', headerName: '7', type: 'number', editable: true, width: 5 },
    { field: 'eight', headerName: '8', type: 'number', editable: true, width: 5 },
    { field: 'nine', headerName: '9', type: 'number', editable: true, width: 5 },
    { field: 'ten', headerName: '10', type: 'number', editable: true, width: 5 },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   width: 100,
    //   cellClassName: 'actions',
    //   getActions: ({ id }) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           sx={{
    //             color: 'primary.main',
    //           }}
    //           onClick={handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }
  ];
  const columnGroupingModel = [
    {
      groupId: 'Position by inning',
      children: [
        { field: 'one' },
        { field: 'two' },
        { field: 'three' },
        { field: 'four' },
        { field: 'five' },
        { field: 'six' },
        { field: 'seven' },
        { field: 'eight' },
        { field: 'nine' },
        { field: 'ten' },
      ],
    },
  ];

  // const handleRowEditStop = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

  // const handleEditClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  // const handleSaveClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };

  // const handleDeleteClick = (id) => () => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  // const handleCancelClick = (id) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });

  //   const editedRow = rows.find((row) => row.id === id);
  //   if (editedRow.isNew) {
  //     setRows(rows.filter((row) => row.id !== id));
  //   }
  // };

  // const processRowUpdate = (newRow) => {
  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   return updatedRow;
  // };

  // const handleRowModesModelChange = (newRowModesModel) => {
  //   setRowModesModel(newRowModesModel);
  // };
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
          <Field.Text name="teamName" label="Team name" />
          <Field.Text name="gameName" label="Game" />
          <Field.DatePicker name="gameDate" label="Date" />
          <Field.Text name="location" label="Location" />
          <Field.Text name="opponentTeam" label="Opponent" />
        </Box>
      </Card>
      <br />
      <Card
        title="Players In Team"
        sx={{
          p: 3,
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }}
      >
        <DataGrid
          rows={teamPlayers}
          columns={columns}
          columnGroupingModel={columnGroupingModel}
          sx={{ border: 0, width: '100%', height: '100%' }}
        />
      </Card>
      <br />
      <Card
        title="Substitution Players"
        sx={{
          p: 3,
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }}
      >
        <DataGrid
          rows={substitutionPlayers}
          columns={columns}
          columnGroupingModel={columnGroupingModel}
          sx={{ border: 0, width: '100%', height: '100%' }}
        />

        <Stack direction="column" spacing={2} alignItems="flex-start">
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentUser ? 'Cancel' : 'Save changes'}
          </LoadingButton>
        </Stack>
        <Stack direction="column" spacing={2} alignItems="flex-start" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentUser ? 'Cancel' : 'Save changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
