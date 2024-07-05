import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const initialState = {
    open:false,
    loading: false,
    error: null,
    open_modif:false,
    data:null
  };

  const tacheSlice = createSlice({
    name: 'tache',
    initialState,
    reducers: {
      open_dialogue:(state)=>{
        state.open = true;
      },
      close_dialogue:(state)=>{
        state.open = false;
      },
      open_dialogue_modif:(state)=>{
        state.open_modif = true;
      },
      close_dialogue_modif:(state)=>{
        state.open_modif = false;
        state.data=null
      },
      add_data: (state, action) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { open_dialogue, close_dialogue,open_dialogue_modif,close_dialogue_modif,add_data } = tacheSlice.actions;
  export default tacheSlice.reducer;
