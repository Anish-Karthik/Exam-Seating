"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  sampleArrangementPlans,
  sampleAttendancePlans,
  sampleHallPlans,
} from "@/test/sample-data";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TotalHallCapacity from "../mini-components/total-hall-capacity";
import TotalStudents from "../mini-components/total-students";
import { Button } from "../ui/button";

const DisplayPlan = dynamic(
  () => import("@/components/display/display-plans"),
  {
    ssr: false,
  }
);

const DisplayPage = () => {
  return (
    <div className="form-group container flex flex-col gap-2 max-sm:min-h-screen max-sm:!p-0">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Button variant="outline">Go Back</Button>
          </Link>
        </div>
        <div className="flex gap-6 max-md:flex-col">
          <TotalHallCapacity />
          <TotalStudents />
        </div>
      </div>
      <Tabs defaultValue="plan">
        <TabsList className="w-full">
          <TabsTrigger value="plan" className="w-full">
            Hall Plan
          </TabsTrigger>
          <TabsTrigger value="arrangement" className="w-full">
            Hall Arrangement
          </TabsTrigger>
          <TabsTrigger value="attendance" className="w-full">
            Attendance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          <DisplayPlan name="hallplan" sampledata={sampleHallPlans} />
        </TabsContent>
        <TabsContent value="arrangement">
          <DisplayPlan
            name="seatarrangement"
            sampledata={sampleArrangementPlans}
          />
        </TabsContent>
        <TabsContent value="attendance">
          <DisplayPlan name="attendance" sampledata={sampleAttendancePlans} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisplayPage;
