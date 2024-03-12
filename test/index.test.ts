import { describe, expect, it, test } from "vitest";

import {
  generateAttendaceSheet,
  generateHallArrangement,
  generateHallPlan,
} from "../server/actions";
import {
  attendanceSheetArr,
  hallArrangementPlansArr,
  hallDataArr,
  hallPlansArr,
  studentDataArr,
} from "./data";

export function add(a: number, b: number) {
  return a + b;
}

test("add", () => {
  expect(add(1, 2)).toBe(3);
});

describe("hall-plan", () => {
  it("should generate hall plan", async () => {
    for (let i = 0; i < studentDataArr.length; i++) {
      expect(await generateHallPlan(studentDataArr[i], hallDataArr[i])).toEqual(
        hallPlansArr[i]
      );
    }
  });
});

describe("hall-arrangement", () => {
  it("should generate hall arrangement", async () => {
    for (let i = 0; i < studentDataArr.length; i++) {
      expect(
        await generateHallArrangement(studentDataArr[i], hallDataArr[i])
      ).toEqual(hallArrangementPlansArr[i]);
    }
  });
});

describe("attendance-sheet", () => {
  it("should generate attendance sheet", async () => {
    for (let i = 0; i < studentDataArr.length; i++) {
      expect(
        await generateAttendaceSheet(studentDataArr[i], hallDataArr[i])
      ).toEqual(attendanceSheetArr[i]);
    }
  });
});
