import { Box, ListItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useDeleteTacheMutation } from '../redux/api/apislice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ModifierTache from './ModifierTache';
import { add_data, open_dialogue_modif } from '../redux/slices/tacheSlice';

function Task({ id, title, description, deadline }) {

  // for redux
    const [deleteTache, { isSuccess: isDeleteSuccess ,isError}] = useDeleteTacheMutation();
    const token = JSON.parse(localStorage.getItem('token'));
    const dispatch=useDispatch()


  // pour faire l'action de supprrimer
  const handleclickdelete=()=>{
    deleteTache({ token, tacheId:id });
  }


  // for show the toast of delete
  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Task deleted successfully!');
    }
  }, [isDeleteSuccess,isError]);




  return (
    <Accordion sx={{ marginBottom: '20px', backgroundColor: '#e1e6ed' }} key={id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {title}
        </Typography>
        <Typography>
          deadline: {deadline}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {description}
        </Box>
       
      </AccordionDetails>
      <AccordionActions>
         <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Typography>
             completed
          </Typography>
          <Checkbox defaultChecked />
        </Box>
        <Button onClick={()=>{
          dispatch(open_dialogue_modif())
          dispatch(add_data({ id, title, description, deadline }))
        }}>modifier</Button>
        <Button onClick={handleclickdelete}>delete</Button>
      </AccordionActions>
    </Accordion>
  )
}

export default Task;
