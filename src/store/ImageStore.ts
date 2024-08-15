import { create } from "zustand";
import { ImagePairInterface, UniqualizationSettingsForm } from "../types";

interface ImageStore {
  images: ImagePairInterface[];
  currentIndex: number;
  setImages: (images: ImagePairInterface[]) => void;
  setCurrentIndex: (index: number) => void;
  updateProcessedImage: (index: number, newProcessedImage: string) => void;
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

  updateProcessedImage: (index: number, newProcessedImage: string) =>
    set((state) => ({
      images: state.images.map((img, i) =>
        i === index ? { ...img, processed: newProcessedImage } : img
      ),
    })),
}));
