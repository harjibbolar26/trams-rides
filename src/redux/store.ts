import { configureStore } from "@reduxjs/toolkit";
import rideReducer from "./rideslice";

export const store = configureStore({
  reducer: {
    rides: rideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
