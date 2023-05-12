import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const createHookModal = () =>
  create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export const useLoginModal = createHookModal();
export const useRegisterModal = createHookModal();
export const useRentModal = createHookModal()
