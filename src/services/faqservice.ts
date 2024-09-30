import { apiRequest } from "@/utils/apiclient";

export const fetchFAQs = async () => {
  return apiRequest('/api/faq');
};
