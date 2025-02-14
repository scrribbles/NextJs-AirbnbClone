"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { XIcon } from "lucide-react";
import { useModalContext } from "@/context/context";

const Modals = () => {
  const { content, closeModal, isOpen, title } = useModalContext();

  // Close modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  // Close modal when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center z-[9999999]"
          onClick={handleOutsideClick}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:w-1/5 lg:w-[35%] bg-white rounded-2xl border shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <p className="text-base font-bold text-center flex-1">{title}</p>
              <button
                onClick={closeModal}
                className="rounded-full border p-2 hover:bg-gray-100 transition"
              >
                <XIcon size={16} className="cursor-pointer" />
              </button>
            </div>
            <div className="p-5">{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modals;
