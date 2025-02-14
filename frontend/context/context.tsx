"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  content: React.ReactNode;
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
  title?: string;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within an ModalProvider");
  }
  return context;
};

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string | undefined>("");

  const openModal = (content: React.ReactNode, title?: string) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setTitle("");
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, content, openModal, closeModal, title }}
    >
      {children}
    </ModalContext.Provider>
  );
}
