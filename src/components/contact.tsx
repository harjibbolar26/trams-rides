import { useState } from "react";
import SideNav from "./sidenav";
import Navbar from "./navbar";
import { useForm } from "react-hook-form";
import { FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

type FormData = {
  name: string;
  email: string;
  rideId: number;
  complain: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
  });
  const allFieldsFilled =
    watch("name") && watch("email") && watch("rideId") && watch("complain");
  const [isOpen, setIsOpen] = useState(false);
  const toggleSubmit = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = () => {
    toggleSubmit();
    reset();
  };

  return (
    <div className="w-[100vw]">
      <div className="flex justify-between">
        <div className="flex flex-col items-center h-screen overflow-y-auto">
          <Navbar width={"calc(100vw - 100px)"} />
          <div className="flex flex-col justify-center items-center gap-3 p-6">
            <p className="text-base sm:text-xl md:text-2xl">
              Do you have a complaint as regarding your booking?{" "}
            </p>
            <p className="">Please fill the form below to get through to us</p>
            <div className="w-full sm:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name field */}
                <FormItem>
                  <label htmlFor="name" className="text-sm sm:text-base">
                    Name
                  </label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </FormItem>

                {/* Email field */}
                <FormItem>
                  <label htmlFor="email" className="text-sm sm:text-base">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </FormItem>

                {/* Ride ID field */}
                <FormItem>
                  <label htmlFor="rideId" className="text-sm sm:text-base">
                    Ride ID
                  </label>
                  <Input
                    id="rideId"
                    type="number"
                    {...register("rideId", {
                      required: "Ride ID is required",
                      valueAsNumber: true,
                      validate: (value) =>
                        !isNaN(value) || "Ride ID must be a number",
                    })}
                    placeholder="Enter ride ID"
                  />
                  {errors.rideId && (
                    <p className="text-red-500 text-xs">
                      {errors.rideId.message}
                    </p>
                  )}
                </FormItem>

                {/* Complain field */}
                <FormItem>
                  <label htmlFor="complain" className="text-sm sm:text-base">
                    Complain
                  </label>
                  <Input
                    id="complain"
                    {...register("complain", {
                      required: "Complain is required",
                    })}
                    placeholder="Enter your complain"
                  />
                  {errors.complain && (
                    <p className="text-red-500 text-xs">
                      {errors.complain.message}
                    </p>
                  )}
                </FormItem>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={!isValid || !allFieldsFilled}
                  className="mt-4 text-xs p-2 sm:text-base "
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="h-screen w-20">
          <SideNav />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={toggleSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complaint submitted</DialogTitle>
          </DialogHeader>
          Your complaint has been submitted and will be attended to. <br />{" "}
          Please keep an eye on your mail
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="default">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
