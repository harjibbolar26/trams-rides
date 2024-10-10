import { useEffect, useState } from "react";
import Navbar from "./navbar";
import SideNav from "./sidenav";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteRide, Ride } from "@/redux/rideslice";
import { saveRidesToLS } from "@/utils/localstorage";
import { format } from "date-fns";
import BookingForm from "./bookingform";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import DeleteDialog from "./delete-dialog";

const Dashboard = () => {
  const dispatch = useDispatch();
  const rides = useSelector((state: RootState) => state.rides.rides);

  useEffect(() => {
    return saveRidesToLS(rides);
  }, [rides]);

  const handleDelete = (id: string) => {
    if (!id) return;
    dispatch(deleteRide(id));
    toggleDialog();
  };

  // const formatDate = (date: string) => {
  //   return new Date(date);
  // };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditingForm, setIsEditingForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Ride | null>(null);
  const [editingRide, setEditingRide] = useState<Ride | null>(null);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleEditingForm = () => {
    setIsEditingForm(!isEditingForm);
  };

  const handleCancel = (rideId: string) => {
    const ride = rides.find((ride) => ride.id === rideId) || null;
    if (!ride) return;
    setSelectedBooking(ride);
    toggleDialog();
  };

  const handleEdit = (rideId: string) => {
    const ride = rides.find((ride) => ride.id === rideId) || null;
    if (!ride) return;
    setEditingRide(ride);
    console.log(editingRide?.date);
    toggleEditingForm();
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex flex-col justify-start items-start h-screen overflow-y-auto">
          <div
            className="fixed z-10 bg-[#efebff]"
            style={{ width: "calc(100vw - 100px)" }}
          >
            <Navbar width={"calc(100vw - 100px)"} />
          </div>
          <div className="p-3 w-full mt-20">
            <div className="mx-auto">
              <p className="text-base sm:text-2xl md:text-4xl text-center">
                Hello <span className="text-primary font-bold"> Doe</span>,
                Welcome to your{" "}
                <span className="text-gradient">Trams Ride</span> Dashboard!
              </p>
            </div>
            <div className="mt-10 sm:mt-16 md:mt-20 text-lg sm:text-xl ">
              {rides.length === 0 ? (
                <div className="flex flex-col">
                  <p className="sm:w-2/3 text-center w-4/5 mx-auto">
                    Unfortunately, you have{" "}
                    <span className="text-error">not</span> booked any ride yet!
                    Click on the button below to book your first ride.
                  </p>
                  <button
                    className="p-2 bg-primary rounded-lg text-white hover:bg-hover transition-all duration-300 w-1/2 mx-auto mt-4 text-base sm:text-xl"
                    onClick={toggleForm}
                  >
                    Book a ride
                  </button>
                </div>
              ) : (
                <div className="">
                  {/* <ul className="w-full">
                    {rides.map((ride, index) => (
                      <li key={index}>
                        <p>
                          <strong>Pickup:</strong> {ride.pickup}
                        </p>
                        <p>
                          <strong>Destination:</strong> {ride.destination}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {format(new Date(ride.date), "EEE, MMM do yyyy")}
                        </p>
                        <p>
                          <strong>Time:</strong> {ride.time}
                        </p>
                        <button
                          onClick={() => handleDelete(ride.id)}
                          className="mt-2 py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul> */}
                  <div className="flex max-sm:flex-col gap-12 m-6">
                    {rides.map((ride, index) => (
                      <div className="flex gap-2">
                        <Card className="">
                          <CardHeader>
                            <CardTitle className="text-primary">
                              Booking {index + 1}
                            </CardTitle>
                            <CardDescription className="text-black">
                              <div className="">
                                Your{" "}
                                {index + 1 === 1
                                  ? "First"
                                  : index + 1 === 2
                                  ? "Second"
                                  : "Third"}{" "}
                                trip to{" "}
                                {ride.destination
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")
                                  .replace(",", " ")}
                              </div>
                              <p className="text-xs sm:text-base">
                                Id:
                                <span>{ride.id}</span>
                              </p>
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="text-xl">
                            <p className="text-base sm:text-lg md:text-xl font-normal">
                              Your trip to{" "}
                              <span className="italic font-bold">
                                {ride.destination}
                              </span>{" "}
                              was successfully booked.
                            </p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl">
                              Your pickup location is{" "}
                              <span className="font-bold">{ride.pickup}</span>{" "}
                              at <span className="font-bold">{ride.time}</span>{" "}
                              on{" "}
                              <span className="font-bold">
                                {ride.date
                                  ? format(
                                      new Date(ride.date),
                                      "EEE, MMM do yyyy"
                                    )
                                  : "N/A"}
                              </span>
                            </p>
                            <p className="text-base sm:text-lg md:text-xl mt-4 font-mono">
                              Thank you for trusting us!
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between text-sm">
                            <div className="flex gap-2">
                              <button
                                // onClick={() => handleDelete(ride.id)}
                                onClick={() => handleCancel(ride.id)}
                                className="mt-2 py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                              >
                                Cancel
                              </button>
                              <button
                                // onClick={() => handleDelete(ride.id)}
                                onClick={() => handleEdit(ride.id)}
                                className="mt-2 py-1 px-2 bg-primary text-white rounded-md hover:bg-hover hover:text-primary"
                              >
                                Edit
                              </button>
                            </div>
                            <p className="text-gradient">
                              Trips by Trams Rides
                            </p>
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                  <div className="mx-auto mt-10">
                    {rides.length === 1 && (
                      <div className=" mx-auto text-lg">
                        <p>Schedule another ride?</p>
                        <button
                          onClick={toggleForm}
                          className="p-2 bg-primary rounded-lg text-white hover:bg-hover transition-all duration-300 text-sm sm:text-base"
                        >
                          Click here
                        </button>
                      </div>
                    )}
                    {rides.length === 2 && (
                      <div className="mx-auto justify-center">
                        <p>You can schedule 1 more ride</p>
                        <button
                          onClick={toggleForm}
                          className="p-2 bg-primary rounded-lg text-white hover:bg-hover transition-all duration-300 text-sm sm:text-base"
                        >
                          Click here
                        </button>
                      </div>
                    )}
                    {rides.length >= 3 && (
                      <div className="text-sm sm:text-base">
                        Oops! You cannot schedule more than 3 rides with your
                        basic plan!
                        <p>Please upgrade your plan to schedule more</p>
                        <p>Thank you for trusting us!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-screen w-20">
          <SideNav />
        </div>
      </div>
      <BookingForm isOpen={isFormOpen} onOpen={toggleForm} />
      <BookingForm
        isOpen={isEditingForm}
        onOpen={toggleEditingForm}
        editingRide={editingRide}
      />
      <DeleteDialog
        isOpen={openDialog}
        onOpen={toggleDialog}
        booking={selectedBooking?.destination.split(" ")[0].replace(",", " ")}
        handleDelete={() => {
          if (selectedBooking && selectedBooking.id) {
            handleDelete(selectedBooking.id);
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
