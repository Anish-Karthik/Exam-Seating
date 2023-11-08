
import { Hall } from '@/lib/type'
import React from 'react'
import { Button } from './ui/button'
import { Edit, Trash } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"

const DisplayHallData = ({
  hall,
  onDelete,
  index,
  onEdit,
}: {
  hall: Hall,
  onDelete: (index: number) => void,
  index: number,
  onEdit: (index: number) => void,
}) => {
  return (
    <div className='flex flex-col-reverse w-full rounded-md max-sm:p-0 p-2 bg-slate-700/20'>
      <div className="flex gap-2 flex-col lg:flex-row flex-wrap xl:flex-nowrap items-center">
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>Hall No.</p>
            <p className="text-xl">{hall.hallno}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>Department</p>
            <p className="text-xl">{hall.dept}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>Students/Bench</p>
            <p className="text-xl">{hall.studentsPerBench}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>Students/Hall</p>
            <p className="text-xl">{hall.studentsPerHall}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>No. of Rows</p>
            <p className="text-xl">{hall.benches.rows}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>No. of Cols</p>
            <p className="text-xl">{hall.benches.cols}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>Extra Bench</p>
            <p className="text-xl">{hall.benches.extra}</p>
          </div>
        </div>
        <div className="max-lg:w-full form-group">
          <div className="flex flex-col items-center gap-2">
            <p>Same Year/Bench</p>
            <p className="text-xl">{hall.isSameYearPerBenchAllowed ? "Yes" : "No"}</p>
          </div>
        </div>
        <div className="flex max-lg:justify-start max-lg:w-full gap-2 flex-wrap lg:flex-nowrap">
          <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 text-xl px-3'
            type="button"
            onClick={() => onEdit(index)}
          >
            <div className="lg:hidden">
              Edit
            </div>
            <Edit className="w-6 h-6 max-lg:hidden" />
          </Button>
          
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3' type="button" >
                <div className="lg:hidden">
                  Delete
                </div>
                <Trash className="w-6 h-6 max-lg:hidden" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will delete your data.
                </DialogDescription>
                <div className='flex justify-end gap-2'>
                  <DialogPrimitive.Close>
                    <Button variant={"outline"}>
                      Cancel
                    </Button>
                  </DialogPrimitive.Close> 
                  <DialogPrimitive.Close>
                    <Button variant={"destructive"} onClick={() => onDelete(index)}>
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