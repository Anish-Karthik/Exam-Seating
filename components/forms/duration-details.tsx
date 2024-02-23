"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDurationDetails } from "@/hooks/use-duration-details";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import DisplayChosenDates from "../display/display-chosen-dates";

const formSchema = z.object({
  date: z.string(),
});

const DurationDetails = () => {
  const { addDate } = useDurationDetails();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addDate(values.date);
    console.log(values);
  }
  return (
    <div>
      <DisplayChosenDates />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 flex max-w-xl flex-row items-center gap-2"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Input
                      className="max-w-xs"
                      placeholder="shadcn"
                      {...field}
                      type="date"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"secondary"}>
            Add Exam Date
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DurationDetails;
