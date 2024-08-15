import { create } from 'zustand';
import { ImagePairInterface } from '../types';

interface ImageStore {
  images: ImagePairInterface[];
  currentIndex: number;
  setImages: (images: ImagePairInterface[]) => void;
  setCurrentIndex: (index: number) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  currentIndex: 0,
  setImages: (images) => set({ images }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
}));