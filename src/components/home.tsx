import { useState } from "react";
import Navbar from "./navbar";
import SideNav from "./sidenav";
import BookingForm from "./bookingform";
import { getRidesFromLS } from "@/utils/localstorage";
import { Link } from "react-router-dom";

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const rides = getRidesFromLS();

  return (
    <div className="w-[100vw]">
      <div className="flex justify-between">
        <div
          className="flex flex-col justify-between items-center h-screen
        "
        >
          <Navbar width={"calc(100vw - 100px)"} />
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="text-primary text-xl sm:text-3xl md:text-5xl">
              Your Journey, Your Control
            </div>
            <div className="text-xs sm:text-l md:text-xl w-4/5 text-center text-gradient text-blue-600">
              Experience ease of booking rides with{" "}
              <span className="text-gradient-reverse">Trams rides</span>
            </div>
            <button
              className="p-2 bg-primary rounded-lg text-white hover:bg-hover transition-all duration-300 text-sm sm:text-lg"
              onClick={toggleForm}
              // disabled={rides.length === 3}
            >
              {rides.length === 3 ? (
                <Link to={"/dashboard"}>Go to dashbaord</Link>
              ) : (
                "Get Started"
              )}
            </button>
          </div>
          <img
            src="/taxi.png"
            alt="taxi"
            className="w-[200px] sm:w-[300px] md:w-[400px]"
          />
        </div>
        <div className="h-screen w-20">
          <SideNav />
        </div>
      </div>
      <BookingForm isOpen={isFormOpen} onOpen={toggleForm} />
    </div>
  );
};

export default Home;
