import { create } from 'zustand';

export const useContentStore = create((set) => ({
  ContentType: 'movie',
  setContentType: (type) => set({ ContentType: type }),
}));
