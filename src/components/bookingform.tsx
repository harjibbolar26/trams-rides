import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRide, Ride, updateRide } from "../redux/rideslice";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";
import { Input } from "./ui/input";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate } from "react-router";

interface BookingFormProps {
  isOpen: boolean;
  onOpen: () => void;
  editingRide?: Ride | null;
}

interface LocationDataProps {
  properties: {
    full_address: string;
  };
}

const BookingForm = ({ isOpen, onOpen, editingRide }: BookingFormProps) => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [destinationQuery, setDestinationQuery] = useState<string>("");
  // const [selectedLocation, setSelectedLocation] = useState<string>("");
  // const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [, setLoading] = useState(false);
  const [suggestedLocations, setSuggestedLocations] = useState<
    LocationDataProps[]
  >([]);
  const [suggestedDestinations, setSuggestedDestinations] = useState<
    LocationDataProps[]
  >([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");

  const isDesktop = screenWidth >= 768;

  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const handleSearch = async (query: string, isLocation: boolean) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${accessToken}&limit=8`
      );
      const data = response?.data?.features;
      const formattedData = data.map((dd: LocationDataProps) => ({
        properties: {
          full_address: dd?.properties?.full_address,
        },
      }));
      if (isLocation) {
        setSuggestedLocations(formattedData);
      } else {
        setSuggestedDestinations(formattedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (locationQuery) {
        handleSearch(locationQuery, true);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [locationQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (destinationQuery) {
        handleSearch(destinationQuery, false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [destinationQuery]);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRide = {
      id: uuidv4(),
      pickup: locationQuery,
      destination: destinationQuery,
      date: date?.toISOString(),
      time,
    };
    dispatch(addRide(newRide));
    if (pathname === "/") navigate("/dashboard");
    // setSelectedLocation("");
    setLocationQuery("");
    // setSelectedDestination("");
    setDestinationQuery("");
    setDate(undefined);
    setTime("");
    onOpen(); // Close the form
  };

  useEffect(() => {
    if (editingRide) {
      setDestinationQuery(editingRide.destination);
      setLocationQuery(editingRide.pickup);
      if (editingRide.date) {
        setDate(new Date(editingRide.date));
      } else {
        setDate(undefined);
      }
      setTime(editingRide.time);
    }
  }, [editingRide]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRide) return;
    const updatedRide = {
      id: editingRide?.id,
      pickup: locationQuery,
      destination: destinationQuery,
      date: date?.toISOString(),
      time,
    };
    dispatch(updateRide(updatedRide));
    // setSelectedLocation("");
    setLocationQuery("");
    // setSelectedDestination("");
    setDestinationQuery("");
    setDate(undefined);
    setTime("");
    onOpen();
  };

  const renderLocationInput = () => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Pickup Location
      </label>
      <Input
        type="text"
        name="location"
        value={locationQuery}
        placeholder="Enter your pickup location"
        onChange={(e) => setLocationQuery(e.target.value)}
        className="w-full"
      />
      {suggestedLocations.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestedLocations.map((loc, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                // setSelectedLocation(loc.properties.full_address);
                setLocationQuery(loc.properties.full_address);
                setSuggestedLocations([]);
              }}
            >
              {loc.properties.full_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDestinationInput = () => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Destination
      </label>
      <Input
        type="text"
        name="destination"
        value={destinationQuery}
        placeholder="Enter your destination"
        onChange={(e) => setDestinationQuery(e.target.value)}
        className="w-full"
      />
      {suggestedDestinations.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestedDestinations.map((loc, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                // setSelectedDestination(loc.properties.full_address);
                setDestinationQuery(loc.properties.full_address);
                setSuggestedDestinations([]);
              }}
            >
              {loc.properties.full_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const datePicker = () => (
    <div className="flex items-center justify-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-fit",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        className="w-fit"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
  );

  const renderForm = () => (
    <form
      onSubmit={editingRide ? handleUpdate : handleSubmit}
      className="space-y-4"
    >
      {renderLocationInput()}
      {renderDestinationInput()}
      {datePicker()}

      <Button
        type="submit"
        className="w-full"
        disabled={!locationQuery || !destinationQuery || !time || !date}
      >
        {editingRide ? "Update Ride" : "Book Ride"}
      </Button>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Your Ride</DialogTitle>
            <DialogDescription>
              Enter your pickup location and destination
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">{renderForm()}</div>
          <DialogFooter>
            <Button onClick={onOpen}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Book Your Ride</DrawerTitle>
          <DrawerDescription>
            Enter your pickup location and destination
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{renderForm()}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpen()}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingForm;
