import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EditCollectionProps {
  image: string | null; // Pass selected image
  title: string;
  description: string;
  year: number;
  generatedId: string; // Add generatedId prop
  userId: string; // Add userId prop
  onEdit: () => void; // Modify this to not pass updatedData here
  onCancel: () => void;
}

export const EditCollection = ({
  image,
  title,
  description,
  year,
  generatedId,
  userId,
  onEdit,
  onCancel,
}: EditCollectionProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(image);
  const [formData, setFormData] = useState({
    title,
    description,
    year,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviewImage(image);
    setFormData({ title, description, year });
  }, [image, title, description, year]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/update-collection/${generatedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          updatedData: {
            title: formData.title,
            description: formData.description,
            year: formData.year,
            image: previewImage,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update collection");
      }

      // Call onEdit to refresh or update the UI if needed
      onEdit();
      alert(data.message);
    } catch (error) {
      console.error("Error updating collection:", error);
      alert("Error updating collection: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.9, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 50, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 500,
      }}
      className="w-[90%] lg:max-w-screen-xl h-[80vh] overflow-hidden flex flex-col mx-auto bg-white rounded-lg p-4 relative"
    >
      <Icon
        onClick={onCancel}
        className="absolute top-4 right-4 cursor-pointer"
        icon="line-md:close-small"
        width="35"
        height="35"
      />
      <h2 className="text-3xl font-extrabold mb-2">EDIT COLLECTION</h2>
      <hr className="border-t border-gray-300 mb-8" />

      <div className="p-4 rounded-lg h-fit overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">UPLOAD</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
              <div className="bg-orange-100 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={500}
                      height={200}
                      className="rounded-lg"
                    />
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-1">
                        Drag and drop files here or click to upload
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-primary-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-primary-2 "
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-primary-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4 flex flex-col gap-4">
              <h3 className="text-xl font-bold">Publication Preview</h3>
              {previewImage ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden w-[300px] h-[400]">
                  <div className="overflow-hidden w-[300px] relative">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-lg font-bold text-white">
                        {formData.title || "Title"}
                      </h3>
                      <p className="text-gray-200">by Author Name</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mt-2 text-gray-800 break-words">
                      {formData.description || "Description"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Upload an image to see the preview.
                </p>
              )}
            </div>

            <motion.button
              onClick={handleSubmit}
              className="w-full py-3 mt-4 bg-orange-500 hover:bg-orange-600 rounded-md text-white"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
