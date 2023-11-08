
import { Check, Trash, X, Edit } from "lucide-react";
import { Hall } from "@/lib/type";
import { SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
;
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DisplayHallData from "./display-hall-data";
import toast from "react-hot-toast";

const formSchema = z.object({
    hallno: z.string().min(3).max(12),
    dept: z.string().min(2).max(5).regex(/^[A-Z]+$/),
    studentsPerBench: z.number().min(1).max(2),
    studentsPerHall: z.number().min(1).max(100),
    isSameYearPerBenchAllowed: z.boolean(),
    benches: z.object({
      rows: z.number().min(1, {message: "Atleast one row is Required"}).max(1000),
      cols: z.number().min(1, {message: "Atleast one col is Required"}).max(1000),
      extra: z.number().min(0).max(1000),
    }).refine(data => data.rows * data.cols + data.extra > 0, {
      message: "Atleast one bench is required"
    })
  }).refine(data => {
    console.log(data.studentsPerHall <= data.studentsPerBench * (data.benches.rows * data.benches.cols + data.benches.extra));
    return data.studentsPerHall <= data.studentsPerBench * (data.benches.rows * data.benches.cols + data.benches.extra);
  }, {
  message: "Insufficient number of benches"
  })


const DisplayHall = ({ defaultIsEdit, hall, onDelete, onEdit, index, setEditingIndex }: { setEditingIndex:  React.Dispatch<React.SetStateAction<boolean[]>>,defaultIsEdit: boolean, hall: Hall, onDelete: (index: number) => void, index: number, onEdit: (index: number, hallData: Hall) => void }) => {
  const [hallData, setHallData] = useState<Hall>(hall);
  const [isEditing, setIsEditing] = useState<boolean>(defaultIsEdit);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: hallData,
    mode: "onChange"
  });
  const {isValid, isSubmitting} = form.formState;
  const handleCancel = (index: number) => {
    form.reset(hallData);
    toggleEdit(index);
  }
  const toggleEdit = (index: number) => {
    setEditingIndex((prevState) => {
      const newArr = [...prevState];
      newArr[index] = !newArr[index];
      return newArr;
    })
    setIsEditing(prevState => !prevState);
  }

  const handleSave = (index: number) => {
    toggleEdit(index);
    onEdit(index, hallData);
  };
  const onSubmit = (data: Hall) => {
    console.log(data);
    setHallData(data);
    handleSave(index);
  }

  console.log(form.getValues())
  if (!isEditing) {
    return <DisplayHallData hall={hallData} onDelete={onDelete} index={index} onEdit={toggleEdit} />
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className='flex flex-col-reverse gap-2 w-full rounded-md max-sm:p-0 p-2 bg-slate-700/20'>
          {form.getValues().studentsPerHall > form.getValues().studentsPerBench * (form.getValues().benches.cols * form.getValues().benches.rows * form.getValues().benches.extra)  && !isValid &&
            <FormMessage itemType="error" className="px-2 pb-2">Insufficient number of benches</FormMessage>
          }
          <div className="flex gap-2 flex-col lg:flex-row flex-wrap xl:flex-nowrap items-center">
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="hallno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`hallno-${index}`}>Hall No.</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="form-control"
                        id={`hallno-${index}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="dept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`dept-${index}`}>Department</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="form-control"
                        id={`dept-${index}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="isSameYearPerBenchAllowed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`isSameYearPerBenchAllowed-${index}`}>Same year together</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value.toString()}
                        onValueChange={(value) => {
                          field.onChange(value === "true");
                        }}
                      >
                        <SelectTrigger className="min-w-[210px] lg:min-w-[150px]">
                          <SelectValue placeholder="Students Per Bench" />
                        </SelectTrigger>
                        <SelectContent defaultValue={"false"}>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="studentsPerBench"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`studentsPerBench-${index}`}>Students/Bench</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value.toString()}
                        onValueChange={(value) => {
                          field.onChange(parseInt(value));
                        }}
                      >
                        <SelectTrigger className="min-w-[210px] lg:min-w-[130px]">
                          <SelectValue placeholder="Students Per Bench" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="studentsPerHall"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`studentsPerHall-${index}`}>Students/Hall</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="form-control"
                        id={`studentsPerHall-${index}`}
                        {...field}
                        onChange={
                          (event) => {
                            field.onChange(event.target.valueAsNumber);
                          }
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="benches.rows"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`benchesRows-${index}`}>No. of Rows</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="form-control"
                        id={`benchesRows-${index}`}
                        {...field}
                        onChange={
                          (event) => {
                            field.onChange(event.target.valueAsNumber);
                          }
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="benches.cols"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`benchesCols-${index}`}>No. of Cols</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="form-control"
                        id={`benchesCols-${index}`}
                        {...field}
                        onChange={
                          (event) => {
                            field.onChange(event.target.valueAsNumber);
                          }
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-lg:w-full form-group">
              <FormField
                control={form.control}
                name="benches.extra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`benchesExtra-${index}`}>Extra Bench</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="form-control"
                        id={`benchesExtra-${index}`}
                        {...field}
                        onChange={
                          (event) => {
                            field.onChange(event.target.valueAsNumber);
                          }
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex max-lg:justify-start max-lg:w-full gap-2 flex-wrap lg:flex-nowrap max-md:pl-2">
              <Button variant={"outline"} className='rounded-full text-green-800 border-green-800 text-xl px-3'
                type="submit"
                disabled={isSubmitting}
              >
                <div className="lg:hidden">
                  Save
                </div>
                <Check className="w-6 h-6 max-lg:hidden" />
              </Button>
              <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3'
                type="button"
                onClick={() => handleCancel(index)}
              >
                <div className="lg:hidden">
                  Cancel
                </div>
                <X className="w-6 h-6 max-lg:hidden" />
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
      </form>
    </Form>
  );
}

export default DisplayHall;
