import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface uiState {
  newTaskOpen: boolean,
  isDragging: boolean,
  isAddingEntry: boolean,
}

const initialState: uiState = {
    newTaskOpen: false,
    isDragging: false,
    isAddingEntry: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    openNew: (state) => {
        state.newTaskOpen = true;
       
      },
    closeNew: (state) => {
        state.newTaskOpen = false;
       
      },
      startDragging: (state) => {
        state.isDragging = true;
       
      },
      endDragging: (state) => {
        state.isDragging = false;
       
      },
      setIsAddingEntry: (state, action) => {
          state.isAddingEntry = action.payload;
        },
        
       
  },
})

// Action creators are generated for each case reducer function
export const {openNew, closeNew, startDragging, endDragging, setIsAddingEntry} = uiSlice.actions

export default uiSlice.reducer