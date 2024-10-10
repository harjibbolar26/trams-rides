import { Ride } from "../redux/rideslice";

const RIDES_STORAGE_KEY = "userRides";

export const saveRidesToLS = (rides: Ride[]): void => {
  try {
    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(rides));
  } catch (error) {
    console.error("Error saving rides to localStorage:", error);
  }
};

export const getRidesFromLS = (): Ride[] => {
  try {
    const rides = localStorage.getItem(RIDES_STORAGE_KEY);
    return rides ? JSON.parse(rides) : [];
  } catch (error) {
    console.error("Error retrieving rides from localStorage:", error);
    return [];
  }
};
