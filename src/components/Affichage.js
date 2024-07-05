import { Box, IconButton, List, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddNewTache from './AddNewTache';
import Task from './Task';
import { useGetTachesQuery, } from '../redux/api/apislice';
import { useDispatch, useSelector } from 'react-redux';
import { open_dialogue } from '../redux/slices/tacheSlice';
import ModifierTache from './ModifierTache';

function Affichage() {
  
      //  for redux 
      const { user } = useSelector((state) => state.user);
      const token = JSON.parse(localStorage.getItem('token'));
      const userId = user?._id;
      const { data, error, isLoading } = useGetTachesQuery({ userId, token });
      const dispatch=useDispatch()

      return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px', backgroundColor: '#076dea', width: '80%', minHeight: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h4" gutterBottom>
            Create your activity today Mr {user.name}
          </Typography>
        </Box>
        <IconButton onClick={()=>{dispatch(open_dialogue())}} sx={{ color: 'white', border: 'dashed', display: 'flex', justifyContent: 'center', padding: '25px', borderRadius: '0px' }}>
          add new task
          <AddIcon fontSize='medium' />
        </IconButton>
        <List>
          {error && <p>A small error occurred.</p>}
          {data && data.taches.map((tache) => (
            <Task
              key={tache._id}
              id={tache._id}
              title={tache.title}
              description={tache.description}
              deadline={tache.deadline}
            />
          ))}
        </List>
      </Box>
      <AddNewTache />
      <ModifierTache/>
    </React.Fragment>
  )
}

export default Affichage;
