import { IHeaderMenu } from "@/components/shared/header";
import { create } from "zustand";

interface OffCanvasHeaderStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  headerMenu: IHeaderMenu[];
  setHeaderMenu: (headerMenu: IHeaderMenu[]) => void;
}

export const useOffCanvasHeaderStore = create<OffCanvasHeaderStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  headerMenu: [],
  setHeaderMenu: (headerMenu) => set({ headerMenu }),
}));
