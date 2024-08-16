import { create } from "zustand";
import { ImagePairInterface, UniqualizationSettingsForm } from "../types";

interface ImageStore {
  images: ImagePairInterface[];
  currentIndex: number;
  setImages: (images: ImagePairInterface[]) => void;
  setCurrentIndex: (index: number) => void;
  updateProcessedImage: (index: number, newProcessedImage: string) => void;
  settings: UniqualizationSettingsForm;
  setSettings: (settings: UniqualizationSettingsForm) => void;
}

const defaultSettings: UniqualizationSettingsForm = {
  copies: 1,
  folderStructure: "oneFolder",
  naming: "hash",
  prefix: "",
  saveNamesList: true,
  rightNumbering: true,
  rotation: { enabled: true, min: -3, max: 3 },
  crop: { enabled: true, side: "random", min: 1, max: 3 },
  saturation: { enabled: true, min: 80, max: 120 },
  brightness: { enabled: true, min: 80, max: 120 },
  contrast: { enabled: true, min: 80, max: 120 },
  reflection: "none",
  noise: { enabled: true, max: 0.1 },
  metadata: true,
};

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  currentIndex: 0,
  setImages: (images) => set({ images }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  settings: defaultSettings,
  setSettings: (settings) => {
    set({ settings });
  },
  
  updateProcessedImage: (index: number, newProcessedImage: string) =>
    set((state) => ({
      images: state.images.map((img, i) =>
        i === index ? { ...img, processed: newProcessedImage } : img
      ),
    })),
}));