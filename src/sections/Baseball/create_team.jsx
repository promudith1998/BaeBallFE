import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  teamName: zod.string().min(1, { message: 'Team Name is required!' }),
  gameName: zod.string().min(1, { message: 'Game is required!' }),
  gameDate: zod.string().min(1, { message: 'Date is required!' }),
  opponentTeam: zod.string().min(1, { message: 'Opponent is required!' }),
  location: zod.string().optional(),
  status: zod.string().optional(),
  isVerified: zod.boolean().optional(),
});

// ----------------------------------------------------------------------

export function CreateTeam({ currentUser }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      teamName: '',
      gameName: '',
      gameDate: '',
      opponentTeam: '',
      location: '',
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
    watch,
    control,
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
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting the form.');
    }
  });

  const teamPlayers = Array.from({ length: 13 }, (_, i) => ({ id: i + 1 }));

  const columns = [
    { field: 'id', headerName: 'Batting Order', width: 120 },
    { field: 'playerNo', headerName: 'Player No', type: 'number', editable: true, width: 120 },
    { field: 'playerName', headerName: 'Player Name', editable: true, flex: 1 },
    ...Array.from({ length: 10 }, (_, i) => ({
      field: `${i + 1}`,
      headerName: `${i + 1}`,
      type: 'number',
      editable: true,
      width: 60,
    })),
  ];

  const columnGroupingModel = [
    {
      groupId: 'Position by inning',
      children: Array.from({ length: 10 }, (_, i) => ({
        field: `${i + 1}`,
      })),
    },
  ];

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="teamName" label="Team Name" />
          <Field.Text name="gameName" label="Game" />
          <Field.DatePicker name="gameDate" label="Date" />
          <Field.Text name="location" label="Location" />
          <Field.Text name="opponentTeam" label="Opponent" />
        </Box>
      </Card>

      <Box mt={3}>
        <Card sx={{ p: 3 }}>
          <DataGrid
            rows={teamPlayers}
            columns={columns}
            columnGroupingModel={columnGroupingModel}
            autoHeight
            disableRowSelectionOnClick
          />
        </Card>
      </Box>

      <Box mt={3}>
        <Card sx={{ p: 3 }}>
          {/* Placeholder for Substitution Players */}
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentUser ? 'Save Changes' : 'Create Team'}
            </LoadingButton>
          </Stack>
        </Card>
      </Box>
    </Form>
  );
}
