import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, CssBaseline, Grid, Link as MuiLink  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { schemaSignup } from '../config/formConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';

const theme = createTheme();

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error} = useSelector((state) => state.user);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: 'onSubmit',
  });
  

  const onSubmit = ({name,email,password}) => {
    dispatch(RegisterUser({name,email,password})).then(res =>{
      if(res.payload.message === 'user created with sucess') {
        navigate('/login')
      }
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  {...register('name')}
                />
                <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
                  {errors.name?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type='email'
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register('email')}
                />
                <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
                  {errors.email?.message}
                  {errors.email && errors.email.message}

                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password')}
                />
                <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
                  {errors.password?.message}
                </Typography>
                {error ?  <Typography component="div" variant="subtitle2" sx={{ color: 'red' }}>
                    {error}
                </Typography>: ''}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/login" variant="body2">
                   {" Already have an account? Sign in"}
              </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
