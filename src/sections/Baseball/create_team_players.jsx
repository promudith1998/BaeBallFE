import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  teamName: zod.string().min(1, { message: 'Team Name is required!' }),
  gameName: zod.string().min(1, { message: 'Game is required!' }),
  gameDate: zod.string().min(1, { message: 'Date is required!' }),
  opponentTeam: zod.string().min(1, { message: 'Opponent is required!' }),

  // Not required
  status: zod.string(),
  isVerified: zod.boolean(),
});

// ----------------------------------------------------------------------

export function CreateTeamPlayers({ currentUser }) {
  const router = useRouter();
  // const [rows, setRows] = React.useState(initialRows);
  // const [rowModesModel, setRowModesModel] = React.useState({});

  const defaultValues = useMemo(
    () => ({
      isVerified: currentUser?.isVerified || true,
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
          <Field.Text name="teamName" label="Team name" />
          <Field.Text name="gameName" label="Game" />
          <Field.DatePicker name="gameDate" label="Date" />
          <Field.Text name="location" label="Location" />
          <Field.Text name="opponentTeam" label="Opponent" />
        </Box>
      </Card>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!currentUser ? 'Cancel' : 'Save changes'}
        </LoadingButton>
        {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!currentUser ? 'Cancel' : 'Save changes'}
        </LoadingButton> */}
      </Stack>
    </Form>
  );
}
