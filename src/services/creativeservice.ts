import { apiRequest } from "@/utils/apiclient";

export const fetchCreatives = async () => {
  return apiRequest('/api/creatives');
};
