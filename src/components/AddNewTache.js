import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { schemaTache } from '../config/formConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTacheMutation } from '../redux/api/apislice';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { close_dialogue } from '../redux/slices/tacheSlice';

function AddNewTache({}) {
  const {open} = useSelector((state) => state.tache);
  const dispatch=useDispatch()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = user?._id;
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: yupResolver(schemaTache),
    mode: 'onSubmit',
  });
  const handleClose=()=>{
        dispatch(close_dialogue())
  }
  const [createTache, { isSuccess,isError }] = useCreateTacheMutation();

  const onSubmit = ({ title, description, deadline }) => {
    const info = {
      title: title,
      description: description,
      deadline: deadline,
      user: userId
    };
    console.log('info', info);
    createTache({ token, data: info });
    handleClose();
  };

 
  useEffect(() => {
    if (isSuccess) {
      reset()
      toast.success('Task created successfully!');
    }
    if (isError) {
      toast.error('Failed to create task.');
    }
  }, [isSuccess, isError]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          width: '50%',
          height: '70%',
          marginLeft: 'auto', marginRight: 'auto'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px', backgroundColor: '#076dea', width: '100%', height: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ width: '100%', color: 'white' }}>
          Create a new task
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' }, display: 'flex', flexDirection: 'column', marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'white' }} noValidate autoComplete="off">
          <TextField id="filled-multiline-flexible" label="Title" multiline maxRows={4} variant="filled" {...register('title')} />
          {errors.title?.message}
          <TextField id="filled-multiline-static" label="Description" multiline rows={4} variant="filled" {...register('description')} />
          {errors.description?.message}
          <TextField id="date" label="Deadline" type="date" variant="filled" InputLabelProps={{ shrink: true }} {...register('deadline')} />
          {errors.deadline?.message}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginRight: '12px' }}>
            <IconButton onClick={handleClose} sx={{ color: 'white', borderRadius: '10px', marginRight: '8px', backgroundColor: 'black', '&:hover': { backgroundColor: 'black' } }}>
              Cancel
            </IconButton>
            <IconButton type='submit' sx={{ color: 'white', backgroundColor: '#076dea', borderRadius: '10px', '&:hover': { backgroundColor: '#076dea' } }}>
              Save
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default AddNewTache;
