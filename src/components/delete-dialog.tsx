import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Button } from "./ui/button";

interface DeleteDialogProps {
  booking: string | undefined;
  isOpen: boolean;
  onOpen: () => void;
  handleDelete: () => void;
}

const DeleteDialog = ({
  booking,
  isOpen,
  onOpen,
  handleDelete,
}: DeleteDialogProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking?
            </DialogDescription>
          </DialogHeader>
          Cancelling your trip to {booking} will remove it from the list of your
          bookings
          <DialogFooter>
            <Button
              type="button"
              variant={"destructive"}
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-300 hover:text-white"
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="default">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
