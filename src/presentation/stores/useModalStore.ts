'use client';

import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  view: string | null;
  data: any | null;
  openModal: (view: string, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  view: null,
  data: null,
  openModal: (view, data = null) => set({ isOpen: true, view, data }),
  closeModal: () => set({ isOpen: false, view: null, data: null }),
}));
