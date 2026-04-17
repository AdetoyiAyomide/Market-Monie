import { create } from "zustand";

export const useAppStore = create((set) => ({
  state: "",
  hub: "",

  setState: (state) => set({ state }),
  setHub: (hub) => set({ hub }),
}));