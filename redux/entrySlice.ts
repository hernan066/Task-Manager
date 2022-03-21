import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../interfaces";

export interface entryState {
  entries: Entry[];
}

const initialState: entryState = {
  entries: [],
};

export const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addNewEntry: (state, action) => {
      state.entries = [ ...state.entries, action.payload ];
    },
    updateEntry: (state, action) => {
      state.entries = state.entries.map( entry => {
        if ( entry._id === action.payload._id ) {
           entry.status = action.payload.status;
           entry.description = action.payload.description;
        }
        return entry;
      })
    },
    refreshEntries: (state, action) => {
      state.entries = [ ...action.payload ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    addNewEntry,
    updateEntry,
    refreshEntries
} = entrySlice.actions;

export default entrySlice.reducer;
