import { getRidesFromLS } from "@/utils/localstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ride {
  id: string;
  pickup: string;
  destination: string;
  date: string | undefined;
  time: string;
}

interface RideState {
  rides: Ride[];
}

const initialState: RideState = {
  rides: getRidesFromLS(),
};

const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    addRide: (state, action: PayloadAction<Ride>) => {
      state.rides.push(action.payload);
    },
    updateRide: (state, action: PayloadAction<Ride>) => {
      const index = state.rides.findIndex(
        (ride) => ride.id === action.payload.id
      );
      if (index !== -1) {
        state.rides[index] = action.payload;
      }
    },
    deleteRide: (state, action: PayloadAction<string>) => {
      state.rides = state.rides.filter((ride) => ride.id !== action.payload);
    },
    setRide: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
    },
  },
});

export const { addRide, updateRide, deleteRide, setRide } = rideSlice.actions;
export default rideSlice.reducer;
