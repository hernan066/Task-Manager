import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  newTaskOpen: boolean
}

const initialState: CounterState = {
    newTaskOpen: false,
}

export const uiSlice = createSlice({
  name: '[Ui] - NewTaskOpen',
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
  },
})

// Action creators are generated for each case reducer function
export const {openNew, closeNew} = uiSlice.actions

export default uiSlice.reducer