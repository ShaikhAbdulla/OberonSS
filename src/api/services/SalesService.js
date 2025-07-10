// src/api/services/salesService.js

import client from "../Client";
import { SALES_ENDPOINTS } from "../Endpoint";



export const getSalesSummary = async (id) => {
  try {
    const response = await client.get(SALES_ENDPOINTS.SUMMARY, {
      params: { id },
    });
    return response.data;
  } catch (error) {
  }
};


export const getSalesData = async (id) => {
  try {
    const response = await client.get(SALES_ENDPOINTS.SALES, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getSalesPdfData = async (id) => {
  try {
    const response = await client.get(`${SALES_ENDPOINTS.SALES_PDF_DATA}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addRemark = async (payload) => {

  try {
    const response = await client.post(SALES_ENDPOINTS.CLIENT_REMARK, payload);
    return response;
  } catch (error) {
    return error

  }

};
