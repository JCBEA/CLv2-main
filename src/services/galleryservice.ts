// services/galleryService.ts

import { apiRequest } from "@/utils/apiclient";

export const fetchGalleryItems = async () => {
  return apiRequest('/api/gallery');
};
