import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Edit, Trash } from "lucide-react"

import { Hall } from "@/lib/type"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"

const DisplayHallData = ({
  hall,
  onDelete,
  index,
  onEdit,
}: {
  hall: Hall
  onDelete: (index: number) => void
  index: number
  onEdit: (index: number) => void
}) => {
  return (
    <div className="flex w-full flex-col-reverse rounded-md bg-slate-700/20 p-2 max-sm:p-0">
      <div className="flex flex-col flex-wrap items-center gap-2 lg:flex-row xl:flex-nowrap">
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Hall No.</p>
            <p className="text-xl">{hall.hallno}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Department</p>
            <p className="text-xl">{hall.dept}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Same Year/Bench</p>
            <p className="text-xl">
              {hall.isSameYearPerBenchAllowed ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Cols Interchange</p>
            <p className="text-xl">{hall.isInterchange ? "Yes" : "No"}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Students/Bench</p>
            <p className="text-xl">{hall.studentsPerBench}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Students/Hall</p>
            <p className="text-xl">{hall.studentsPerHall}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>No. of Rows</p>
            <p className="text-xl">{hall.benches.rows}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>No. of Cols</p>
            <p className="text-xl">{hall.benches.cols}</p>
          </div>
        </div>
        <div className="form-group max-lg:w-full">
          <div className="flex flex-col items-center gap-2">
            <p>Extra Bench</p>
            <p className="text-xl">{hall.benches.extra}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 max-lg:w-full max-lg:justify-start lg:flex-nowrap">
          <Button
            variant={"outline"}
            className="rounded-full border-blue-800 px-3 text-xl text-blue-800"
            type="button"
            onClick={() => onEdit(index)}
          >
            <div className="lg:hidden">Edit</div>
            <Edit className="h-6 w-6 max-lg:hidden" />
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button
                variant={"outline"}
                className="rounded-full border-red-800 px-3 text-xl text-red-800"
                type="button"
              >
                <div className="lg:hidden">Delete</div>
                <Trash className="h-6 w-6 max-lg:hidden" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will delete your data.
                </DialogDescription>
                <div className="flex justify-end gap-2">
                  <DialogPrimitive.Close>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogPrimitive.Close>
                  <DialogPrimitive.Close>
                    <Button
                      variant={"destructive"}
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </Button>
                  </DialogPrimitive.Close>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default DisplayHallData
