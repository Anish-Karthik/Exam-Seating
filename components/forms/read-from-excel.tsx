import React, { useState } from "react";
import { Student, StudentsPerYear } from "@/server/type";
import { excelDataState } from "@/store/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, Edit, Trash, X } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as XLSX from "xlsx";
import { z } from "zod";

import { dataWrangleTheExcelData, intToRoman, romanToInt } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DisplayExcelFormData from "../display/display-excel-form-data";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  filename: z.string().min(1, { message: "please upload a file" }),
  studentData: z.array(
    z.object({
      name: z.string(),
      rollno: z.string(),
      section: z.string(),
      sno: z.number(),
      regno: z.number(),
    })
  ),
  strength: z.number(),
  year: z.number().refine(
    (data) => {
      return data >= 1 && data <= 4;
    },
    { message: "must be a number" }
  ),
  semester: z.number().refine(
    (data) => {
      return data >= 1 && data <= 8;
    },
    { message: "must be a number" }
  ),
  dept: z.string(),
});

const readExcel = (
  file: File | null,
  form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>
) => {
  if (!file) {
    return;
  }
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      if (!e && !e.target && !e.target.result) {
        throw new Error("File not found");
      }
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  promise.then((d) => {
    const data = dataWrangleTheExcelData(d);
    form.setValue("studentData", data);
    form.setValue("strength", data.length);
    form.setValue("filename", file.name);
    console.log(form.getValues());
    console.log(form.formState.isValid);
    console.log(form.formState.dirtyFields);
    console.log(data);
    // setData({
    //   filename: file.name,
    //   students: data,
    //   strength: data.length,
    // });
    console.log(data);
  });
};

const ReadFromExcel = ({
  defaultIsEdit = true,
  excelData,
  setEditingIndex,
  index,
}: {
  index: number;
  excelData: StudentsPerYear;
  defaultIsEdit?: boolean;
  setEditingIndex: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const setExcelData = useSetRecoilState(excelDataState);
  const [isEditing, setIsEditing] = useState<boolean>(defaultIsEdit);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: excelData,
    mode: "onChange",
  });
  const { isValid, isSubmitting } = form.formState;
  const toggleEdit = (index: number) => {
    setEditingIndex((prevState) => {
      const newArr = [...prevState];
      newArr[index] = !newArr[index];
      return newArr;
    });
    setIsEditing((prevState) => !prevState);
  };

  const handleCancel = (index: number) => {
    form.reset(excelData);
    toggleEdit(index);
  };

  const handleDeleteData = (index: number) => {
    setExcelData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleSave = (index: number) => {
    toggleEdit(index);
  };
  console.log(isValid, form.getValues());
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setExcelData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        dept: data.dept,
        filename: data.filename,
        semester: data.semester,
        strength: data.strength,
        studentData: data.studentData,
        year: data.year,
      };
      return newData;
    });
    handleSave(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="flex w-full flex-col items-center gap-2 rounded-md bg-slate-700/20 p-2 max-sm:p-0 lg:flex-row">
          {!isEditing ? (
            <DisplayExcelFormData excelData={excelData} />
          ) : (
            <div className="flex w-full flex-col gap-2 p-1 lg:flex-row">
              <FormField
                control={form.control}
                name="filename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`file-${index}`}>Excel File</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 max-xs:flex-col">
                        <Input
                          placeholder="Excel File"
                          id={`file-${index}`}
                          type="file"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const file = e?.target?.files![0];
                            console.log(file);
                            readExcel(file, form);
                          }}
                        />
                        {excelData.filename && (
                          <p className="text-sm">{excelData.filename}</p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`department-${index}`}>
                      Department
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={`department-${index}`}
                        type="text"
                        {...field}
                        placeholder="Department"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`year-${index}`}>Year</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={intToRoman(field.value)}
                        onValueChange={(value) => {
                          field.onChange(romanToInt(value));
                        }}
                      >
                        <SelectTrigger className="min-w-[210px] lg:min-w-[150px] xl:min-w-[135px]">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((year) => (
                            <SelectItem
                              key={year}
                              value={intToRoman(year) as string}
                            >
                              {intToRoman(year)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`semester-${index}`}>
                      Semester
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={intToRoman(field.value)}
                        onValueChange={(value) => {
                          field.onChange(romanToInt(value));
                        }}
                      >
                        <SelectTrigger className="min-w-[210px] lg:min-w-[150px] xl:min-w-[135px]">
                          <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                            <SelectItem
                              key={semester}
                              value={intToRoman(semester) as string}
                            >
                              {intToRoman(semester)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2 max-lg:w-full max-md:pb-2 max-md:pl-2 lg:flex-nowrap">
            {isEditing && (
              <Button
                variant={"outline"}
                className="rounded-full border-green-800 px-3 text-xl text-green-800"
                type="submit"
                disabled={isSubmitting}
              >
                <div className="lg:hidden">Save</div>
                <Check className="h-6 w-6 max-lg:hidden" />
              </Button>
            )}
            {isEditing ? (
              <Button
                variant={"outline"}
                className="rounded-full border-red-800 px-3 text-xl text-red-800"
                type="button"
                onClick={() => {
                  handleCancel(index);
                }}
              >
                <div className="lg:hidden">Cancel</div>
                <X className="h-6 w-6 max-lg:hidden" />
              </Button>
            ) : (
              <Button
                variant={"outline"}
                className="rounded-full border-blue-800 px-3 text-xl text-blue-800"
                type="button"
                onClick={() => toggleEdit(index)}
              >
                <div className="lg:hidden">Edit</div>
                <Edit className="h-6 w-6 max-lg:hidden" />
              </Button>
            )}
            <Dialog>
              <DialogTrigger>
                <Button
                  variant={"outline"}
                  className="rounded-full border-red-800 px-3 text-xl text-red-800"
                >
                  <div className="lg:hidden">Delete</div>
                  <Trash className="h-6 w-6 max-lg:hidden" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                  <div className="flex justify-end gap-2">
                    <DialogPrimitive.Close>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogPrimitive.Close>
                    <DialogPrimitive.Close>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeleteData(index)}
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
      </form>
    </Form>
  );
};

export default ReadFromExcel;
