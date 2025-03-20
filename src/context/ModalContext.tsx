"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MediaResponse } from "@/types/media";

type ModalContextType = {
  media: MediaResponse | null;
  openModal: (media: MediaResponse) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [media, setMedia] = useState<MediaResponse | null>(null);

  const openModal = (media: MediaResponse) => setMedia(media);
  const closeModal = () => setMedia(null);

  return (
    <ModalContext.Provider value={{ media, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    console.error("useModal must be used within a ModalProvider");
  }
  return context!;
}
