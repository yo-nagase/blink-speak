import { configureStore, createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      console.log("add song");
      state.push(action.payload);
    },
    removeSong(state, action) {}
  }
});

export const store = configureStore({
  reducer: {
    songs: songsSlice.reducer
  }
});

console.log(store);
