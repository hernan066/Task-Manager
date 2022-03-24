import { createSlice } from "@reduxjs/toolkit";
import { Entry, EntryStatus } from "../interfaces";

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
    
    addNewEntry: (state, action) => {
      state.entries = [ ...state.entries, action.payload ];
    },
    updateEntry: (state, action) => {
      state.entries = state.entries.map( (entry: { _id: string; status: EntryStatus; description: string; }) => {
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
    deleteEntries: (state, action) => {
      state.entries = state.entries.filter( (entry: { _id: string; }) => entry._id !== action.payload );
    },
  },
});


export const {
    addNewEntry,
    updateEntry,
    refreshEntries,
    deleteEntries,
} = entrySlice.actions;

export default entrySlice.reducer;
