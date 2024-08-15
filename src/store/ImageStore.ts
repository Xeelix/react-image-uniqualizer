import { create } from "zustand";
import { ImagePairInterface, UniqualizationSettingsForm } from "../types";

interface ImageStore {
  images: ImagePairInterface[];
  currentIndex: number;
  setImages: (images: ImagePairInterface[]) => void;
  setCurrentIndex: (index: number) => void;
  settings: UniqualizationSettingsForm | null;
  setSettings: (settings: UniqualizationSettingsForm) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  currentIndex: 0,
  setImages: (images) => set({ images }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  settings: null,
  setSettings: (settings) => set({ settings }),
}));
