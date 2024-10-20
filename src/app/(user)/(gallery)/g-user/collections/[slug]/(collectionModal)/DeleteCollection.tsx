import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";

interface DeleteCollectionProps {
  isOpen: boolean;
  generatedId: string | null;
  imagePath: string;
  userId: string;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const DeleteCollection: React.FC<DeleteCollectionProps> = ({
  isOpen,
  generatedId,
  imagePath,
  userId,
  onDelete,
  onCancel,
}) => {
  const handleDelete = () => {
    if (generatedId) {
      onDelete(generatedId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-[1000] flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onCancel}
        >
          <motion.div
            className="w-full max-w-sm p-4 bg-white rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside it
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }} // Sync opening and closing animations
          >
            <DeleteHeader />
            <hr className="mt-2 border-t border-gray-400" />
            <div className="w-full flex gap-4 p-4">
              <DeleteButton onDelete={handleDelete} />
              <CancelButton onCancel={onCancel} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeleteHeader = () => {
  return (
    <div className="flex justify-start items-center gap-2">
      <Icon
        className="text-red-500"
        icon="ic:round-delete-forever"
        width="60"
        height="60"
      />
      <div className="flex flex-col gap-0.5">
        <h1 className="font-bold text-xl">Delete this item</h1>
        <p className="text-base font-medium">This action cannot be undone</p>
      </div>
    </div>
  );
};

const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-red-500 text-white px-4 py-3 rounded font-semibold w-full"
      onClick={onDelete}
    >
      Delete
    </motion.button>
  );
};

const CancelButton: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-300 px-4 py-3 rounded font-semibold w-full"
      onClick={onCancel}
    >
      Cancel
    </motion.button>
  );
};

export default DeleteCollection;
