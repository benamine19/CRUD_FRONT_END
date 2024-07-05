import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { schemaTache } from '../config/formConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTacheMutation, useUpdateTacheMutation } from '../redux/api/apislice';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { close_dialogue_modif } from '../redux/slices/tacheSlice';

function ModifierTache({}) {
   // pour redux 
   const {open_modif} = useSelector((state) => state.tache);
   const dispatch=useDispatch()
   const { user } = useSelector((state) => state.user);
   const { data } = useSelector((state) => state.tache);
   console.log('data', data)
   const token = JSON.parse(localStorage.getItem('token'));
   const userId = user?._id;
   const handleClose=()=>{
         dispatch(close_dialogue_modif())
   }
   const [updateTache,{ isSuccess,isError }]=useUpdateTacheMutation()

  // pour MUI
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

 // pour le formulaire
 const { register, handleSubmit,watch, reset, formState: { errors } } = useForm({
  defaultValues: {
    title: data?.title || '',
    description: data?.description || '',
    deadline: data?.deadline || '',
  },
  resolver: yupResolver(schemaTache),
  mode: 'onSubmit',
});

useEffect(() => {
  if (data) {
    reset({
      title: data.title || '',
      description: data.description || '',
      deadline: data.deadline || '',
    });
  }
}, [data, reset]);

  // const [createTache, { isSuccess,isError }] = useCreateTacheMutation();

  const onSubmit = ({ title, description, deadline }) => {
    const info = {
      title: title,
      description: description,
      deadline: deadline,
      user: userId
    };
    updateTache({ token, tacheId:data.id,data: info });
    handleClose()
  };

// pour les toast 
useEffect(() => {
  if (isSuccess) {
    reset()
    toast.success('Task bein modified successfully!');
  }
  if (isError) {
    toast.error('Failed to create task.');
  }
}, [isSuccess, isError]);


    // surveiller les valeurs du formulaire poue savoir si les valeur est modifie ou pas 
    const currentValues = watch();
    const [isModified, setIsModified] = useState(false);
  
    useEffect(() => {
      const isFormModified = Object.keys(currentValues).some(
        (key) => currentValues[key] !== data?.[key]
      );
      setIsModified(isFormModified);
    }, [currentValues, data]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open_modif}
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
          Modifier cette task
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
            <IconButton disabled={!isModified} type='submit' sx={{ color: 'white', backgroundColor: '#076dea', borderRadius: '10px', '&:hover': { backgroundColor: '#076dea' } }}>
              Save
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ModifierTache;
