import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface uiState {
  newTaskOpen: string,
  isDragging: boolean,
  typeTabEntry: string,
  openEditTask: boolean,
}

const initialState: uiState = {
    newTaskOpen: 'id-new-task-close',
    isDragging: false,
    typeTabEntry: 'all',
    openEditTask: false,
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
        state.newTaskOpen = 'id-new-task-open';
       
      },
    closeNew: (state) => {
        state.newTaskOpen = 'id-new-task-close';
       
      },
      startDragging: (state) => {
        state.isDragging = true;
       
      },
      endDragging: (state) => {
        state.isDragging = false;
       
      },
      openEdit: (state) => {
        state.openEditTask = true;
       
      },
      closeEdit: (state) => {
        state.openEditTask = false;
       
      },
      setTypeTabEntry: (state, action) => {
          state.typeTabEntry = action.payload;
        },
        
       
  },
})

// Action creators are generated for each case reducer function
export const {openNew, closeNew, startDragging, endDragging, setTypeTabEntry, openEdit, closeEdit } = uiSlice.actions

export default uiSlice.reducer