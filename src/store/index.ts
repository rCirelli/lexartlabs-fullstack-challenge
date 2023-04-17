import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'

export interface State {
  source: string;
  category: string;
  query: string;
  setState: (key: keyof State, value: string) => void;
  shouldFetch?: boolean;
  toggleShouldFetch?: () => void;
}

export const useStore = create<State>()((set) => ({
  source: "",
  category: "",
  query: "",
  setState: (key: keyof State, value: string) => set(() => ({ [key]: value })),
  // shouldFetch: false,
  // toggleShouldFetch: () => set((state) => ({ shouldFetch: !state.shouldFetch })),
}));

export const useFetchStore = create(subscribeWithSelector((set, get, api) => ({
  shouldFetch: false,
  toggleShouldFetch: () => set((state: State) => ({ shouldFetch: !state.shouldFetch })),
})));
