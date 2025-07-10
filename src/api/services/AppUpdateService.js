import client from "../Client";
import { APP_UPDATE_ENDPOINTS, SALES_ENDPOINTS } from "../Endpoint";

export const getAppVersion = async () => {
  try {
     const response = await client.get(APP_UPDATE_ENDPOINTS.FORCE_UPDATE);
   return response.data;
  } catch (error) {
     console.error('Error fetching sales summary:', error);
    throw error;
  }
 
 
};