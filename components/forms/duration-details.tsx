"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDurationDetails } from "@/hooks/use-duration-details";
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

import MultipleSelectorDemo from "../mini-components/multi-select";

const formSchema = z.object({
  date: z.string(),
});

const DurationDetails = () => {
  const { dates, setDates, addDate, removeDate } = useDurationDetails();
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-xl flex-row gap-2 space-y-8"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div className="flex max-w-3xl flex-wrap">
                    {dates.map((date) => (
                      <span
                        key={date}
                        className="flex items-center rounded-2xl bg-slate-200 px-1"
                      >
                        {date}
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => removeDate(date)}
                        >
                          <X size={15} />
                        </button>
                      </span>
                    ))}
                  </div>
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
  );
};

export default DurationDetails;
