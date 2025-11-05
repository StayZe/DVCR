import { create } from "zustand";
import { EventType } from "./types";

interface EventStore {
  currentEvent: EventType | null;
  setEvent: (event: EventType) => void;
  clearEvent: () => void;
}

export const useEventStore = create<EventStore>((set) => ({
  currentEvent: null,
  setEvent: (event) => set({ currentEvent: event }),
  clearEvent: () => set({ currentEvent: null }),
}));
