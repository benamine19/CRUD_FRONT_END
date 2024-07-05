import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, CssBaseline, Grid, Link as MuiLink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { schemaLogin } from '../config/formConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser} from '../redux/slices/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


const theme = createTheme();

function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onSubmit',
  });
  const { loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate()

  const onSubmit = ({ email, password }) => {
    dispatch(LoginUser({ email, password })).then(result=>{
      if(result.payload.message === 'Login success') {
        // toast.success('Login successful!');
        navigate('/')
      }else{
        // toast.error(result.payload.message || 'Login failed');
      }
    });
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', { required: true })}
            />
            <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
              {errors.email?.message}
              {errors.email && errors.email.message}

            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: true, minLength: 3 })}
            />
            <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
              {errors.password?.message}
            </Typography>
           {error ?  <Typography component="div" variant="subtitle2" sx={{ color: 'red' }}>
              {error}
            </Typography>: ''}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '18px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                 <MuiLink component={Link} to="/signup" variant="body2">
                   {"Forgot password?"}
                 </MuiLink>
              </Grid>
              <Grid item>
              <MuiLink component={Link} to="/signup" variant="body2">
                   {"Don't have an account? Sign Up"}
              </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
