import { z as zod } from 'zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, schemaHelper } from 'src/components/hook-form';

import { CONFIG } from '../../config-global';

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
  const [balls, setBalls] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [outs, setOuts] = useState(0);
  const [bases, setBases] = useState({
    first: false,
    second: false,
    third: false,
  });
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
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
              {/* Baseball field */}
              <Box
                alt="Baseball field"
                component="img"
                src={`${CONFIG.assetsDir}/assets/baseball/baseball.svg`}
                sx={{ width: '100%', height: '100%' }}
              />

              {/* Base markers */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '52%',
                  left: '69%',
                  transform: 'translate(-50%, -50%)',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: bases.first ? 'yellow' : 'transparent',
                  border: '2px solid yellow',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: '34%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: bases.second ? 'yellow' : 'transparent',
                  border: '2px solid yellow',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: '52%',
                  left: '31%',
                  transform: 'translate(-50%, -50%)',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: bases.third ? 'yellow' : 'transparent',
                  border: '2px solid yellow',
                }}
              />
            </Box>
            {/* Pitch & Hit Buttons Section */}
            <Stack direction="column" spacing={4} mt={5} alignItems="left">
              {/* Pitches Section */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'yellow' }}>
                  Pitches
                </Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setBalls((prev) => (prev < 4 ? prev + 1 : prev))}
                >
                  BALL
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() =>
                    setStrikes((prev) => {
                      if (prev < 2) return prev + 1;
                      setStrikes(0);
                      setOuts((outPrev) => (outPrev < 3 ? outPrev + 1 : 0));
                      return 0;
                    })
                  }
                >
                  STRIKE
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setOuts((prev) => (prev < 3 ? prev + 1 : 0))}
                >
                  OUT
                </Button>
              </Stack>

              {/* Hits Section */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'yellow' }}>
                  Hits
                </Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setBases({ first: true, second: false, third: false })}
                >
                  SINGLE
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setBases({ first: true, second: true, third: false })}
                >
                  DOUBLE
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setBases({ first: true, second: true, third: true })}
                >
                  TRIPLE
                </Button>
                <Button variant="contained" color="inherit">
                  HOME RUN
                </Button>
              </Stack>
            </Stack>
            <Box
              sx={{
                position: 'fixed',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                bgcolor: 'green',
                p: 2,
                borderRadius: '8px 0 0 8px',
                boxShadow: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                minHeight: 200,
                justifyContent: 'center',
              }}
            >
              {/* Outs */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography color="white" fontWeight="bold">
                  Outs
                </Typography>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '2px solid yellow',
                      bgcolor: i < outs ? 'yellow' : 'transparent', // change this condition
                    }}
                  />
                ))}
              </Stack>

              {/* Balls */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography color="white" fontWeight="bold">
                  Balls
                </Typography>
                {[0, 1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '2px solid yellow',
                      bgcolor: i < balls ? 'yellow' : 'transparent', // change this condition
                    }}
                  />
                ))}
              </Stack>

              {/* Strikes */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography color="white" fontWeight="bold">
                  Strikes
                </Typography>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '2px solid yellow',
                      bgcolor: i < strikes ? 'yellow' : 'transparent', // change this condition
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
