import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

interface DeleteCollectionProps {
  generatedId: string | null;
  imagePath: string; // New prop for image path
  userId: string; // New prop for user ID
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const DeleteCollection: React.FC<DeleteCollectionProps> = ({
  generatedId,
  imagePath,
  userId,
  onDelete,
  onCancel,
}) => {
  // Check if generatedId is not null before attempting to delete
  const handleDelete = () => {
    if (generatedId) {
      onDelete(generatedId);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-[1000]"
      onClick={onCancel}
    >
      <div className="w-full h-full flex justify-center items-center px-[5%]">
        <div
          className="w-full h-fit max-w-sm p-4 bg-white rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <DeleteHeader />
          <hr className="mt-2 border-t border-gray-400" />
          <div className="w-full flex gap-4 p-4">
            <DeleteButton onDelete={handleDelete} />
            <CancelButton onCancel={onCancel} />
          </div>
        </div>
      </div>
    </div>
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-gray-300 px-4 py-3 rounded font-semibold w-full"
      onClick={onCancel}
    >
      Cancel
    </motion.button>
  );
};

export default DeleteCollection;
