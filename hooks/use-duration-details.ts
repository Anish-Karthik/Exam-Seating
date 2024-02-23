import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DurationDetails = {
  date: string;
  timings: { fn: boolean; an: boolean };
};

type UseDurationDetails = {
  details: DurationDetails[];
  getDates: () => string[];
  addDate: (date: string) => void;
  removeDate: (date: string) => void;
  setDates: (dates: string[]) => void;
  getStartDate: () => string;
  getEndDate: () => string;
  setTimingsForDate: (
    date: string,
    timings: { fn: boolean; an: boolean }
  ) => void;
  getTimingsForDate: (date: string) => { fn: boolean; an: boolean };
};

type MyStateCreatorPersist = StateCreator<
  UseDurationDetails,
  [],
  [["zustand/persist", DurationDetails]]
>;
type MyStateCreator = StateCreator<UseDurationDetails, []>;

const durationDetailsStore: MyStateCreator = (set, get) => ({
  details: [],
  getDates: () => get().details.map((d) => d.date),
  addDate: (date) => {
    if (get().details.find((d) => d.date === date)) return;
    set((state) => {
      return {
        details: [
          ...state.details,
          { date: date, timings: { fn: false, an: false } },
        ],
      };
    });
  },
  removeDate: (date) => {
    set((state) => {
      return {
        details: state.details.filter((d) => d.date !== date),
      };
    });
  },
  setDates: (dates) => {
    set((state) => {
      return {
        details: dates.map((date) => {
          const existing = state.details.find((d) => d.date === date);
          if (existing) return existing;
          return { date: date, timings: { fn: false, an: false } };
        }),
      };
    });
  },
  getStartDate: () => {
    const dates = get().details.map((d) => d.date);
    return dates.length ? dates[0] : "";
  },
  getEndDate: () => {
    const dates = get().details.map((d) => d.date);
    return dates.length ? dates[dates.length - 1] : "";
  },
  setTimingsForDate: (date, timings) => {
    set((state) => {
      return {
        details: state.details.map((d) => {
          if (d.date === date) {
            return { ...d, timings };
          }
          return d;
        }),
      };
    });
  },
  getTimingsForDate: (date) => {
    const d = get().details.find((d) => d.date === date);
    return d ? d.timings : { fn: false, an: false };
  },
});

export const durationDetailsStorePersist: MyStateCreatorPersist = persist(
  durationDetailsStore,
  {
    name: "college-details",
    storage: createJSONStorage(() => localStorage),
  }
);

export const useDurationDetails = create(durationDetailsStorePersist);
export const usePreviewDurationDetails = create(durationDetailsStore);
