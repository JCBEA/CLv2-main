"use client";

interface GalleryItemProps {
  item: {
    id: string;
    title: string;
    imageUrl: string;
  };
}

const _GalleryItem = ({ item }: GalleryItemProps) => {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{item.title}</h2>
      </div>
    </div>
  );
};

export default _GalleryItem;
