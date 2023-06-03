import { configureStore, createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      console.log("add song");
      state.push(action.payload);
    },
    removeSong(state, action) { }
  }
});


//
export const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
