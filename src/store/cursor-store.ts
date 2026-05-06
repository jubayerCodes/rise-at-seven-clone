import { create } from "zustand";

interface CursorStore {
  text: string;
  setText: (text: string) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  text: "",
  setText: (text) => set({ text }),
}));
