import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCollegeDetails,
  usePreviewCollegeDetails,
} from "@/hooks/use-college-details";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import HeaderPreview from "../display/header-preview";

const formSchema = z.object({
  collegeName: z.string().min(2, {
    message: "College name is too short",
  }),
  description: z.string().optional(),
  department: z.string(),
  departmentCode: z.string(),
  examName: z.string(),
  academicYear: z.string(),
  semester: z.enum(["ODD", "EVEN"]),
  districtName: z.string(),
});

const CollegeDetails = () => {
  const { setCollegeDetails, collegeDetails } = useCollegeDetails();
  const {
    changeAcademicYear,
    changeCollegeName,
    changeDepartment,
    changeDepartmentCode,
    changeDescription,
    changeExamName,
    changeSemester,
    changeDistrictName,
    setCollegeDetails: setPreviewCollegeDetails,
  } = usePreviewCollegeDetails();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academicYear: collegeDetails.academicYear || "2023-2024",
      collegeName:
        collegeDetails.collegeName ||
        "PSNA COLLEGE OF ENGINEERING AND TECHNOLOGY",
      description:
        collegeDetails.description ||
        "An Autonomous Institution affiliated to Anna University",
      department:
        collegeDetails.department ||
        "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING",
      departmentCode: collegeDetails.departmentCode || "CSE",
      examName: collegeDetails.examName || "SERIAL TEST - I",
      semester: collegeDetails.semester || "ODD",
      districtName: collegeDetails.districtName || "DINDIGUL",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setCollegeDetails(values);
    console.log(values);
  }
  useEffect(() => {
    setPreviewCollegeDetails({ ...collegeDetails });
  }, [collegeDetails, form.formState.isDirty, setPreviewCollegeDetails]);
  const data = form.getValues();
  console.log(form.getValues());
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Button
            variant={"outline"}
            className="rounded-3xl border-blue-700 text-blue-700"
          >
            Fill college Details
          </Button>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="flex gap-2">
                  {/* collegeName */}
                  <FormField
                    control={form.control}
                    name="collegeName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="PSNA COLLEGE OF ENGINEERING AND TECHNOLOGY"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changeCollegeName(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* districtName */}
                  <FormField
                    control={form.control}
                    name="districtName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DINDIGUL"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changeDistrictName(e.target.value);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="An Autonomous Institution affiliated to Anna University"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            changeDescription(e.target.value);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  {/* department */}
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changeDepartment(e.target.value);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* departmentCode */}
                  <FormField
                    control={form.control}
                    name="departmentCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DEPT-CODE"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changeDepartmentCode(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  {/* examName */}
                  <FormField
                    control={form.control}
                    name="examName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SERIAL TEST - I"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changeExamName(e.target.value);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* academicYear */}
                  <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2023-2024"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changeAcademicYear(e.target.value);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* semester */}
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester</FormLabel>

                        <Select
                          {...field}
                          onValueChange={(value: "ODD" | "EVEN") => {
                            field.onChange(value);
                            changeSemester(value);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ODD">ODD</SelectItem>
                            <SelectItem value="EVEN">EVEN</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="mr-3 mt-3">
                  Submit
                </Button>
              </form>
            </Form>
            <HeaderPreview isSubmitted={form.formState.isDirty} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollegeDetails;
