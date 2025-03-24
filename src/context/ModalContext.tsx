"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { MediaResponse } from "@/types/media";

type ModalContextType = {
  media: MediaResponse | null;
  modalOpen: boolean;
  openModal: (media: MediaResponse) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [media, setMedia] = useState<MediaResponse | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (media: MediaResponse) => {
    setMedia(media);
    setModalOpen(true);
  };
  const closeModal = () => {
    setMedia(null);
    setModalOpen(false);
  };

  const contextValue = useMemo(() => ({ media, modalOpen, openModal, closeModal }), [media]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context!;
}
