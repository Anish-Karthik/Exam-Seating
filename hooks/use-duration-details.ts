import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DurationDetails = {
  dates: string[];
};

type UseDurationDetails = DurationDetails & {
  setDates: (dates: string[]) => void;
  addDate: (date: string) => void;
  clearDates: () => void;
  removeDate: (date: string) => void;
  getStartDate: () => string;
  getEndDate: () => string;
};

type MyStateCreatorPersist = StateCreator<
  UseDurationDetails,
  [],
  [["zustand/persist", DurationDetails]]
>;
type MyStateCreator = StateCreator<UseDurationDetails, []>;

const durationDetailsStore: MyStateCreator = (set, get) => ({
  dates: [],
  setDates: (dates: string[]) => set(() => ({ dates })),
  addDate: (date: string) =>
    set((state) => ({ dates: [...state.dates, date] })),
  clearDates: () => set(() => ({ dates: [] })),
  removeDate: (date: string) =>
    set((state) => ({ dates: state.dates.filter((d) => d !== date) })),
  getStartDate: () => {
    const dates = get().dates;
    return dates.length > 0 ? dates[0] : "";
  },
  getEndDate: () => {
    const dates = get().dates;
    return dates.length > 0 ? dates[dates.length - 1] : "";
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
