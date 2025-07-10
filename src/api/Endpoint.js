// src/api/endpoints.js

export const BASE_URL = 
// 'https://lancia.co.in',
'https://besbupload.com';

export const APP_UPDATE_ENDPOINTS = {
FORCE_UPDATE:`${BASE_URL}/api/Auth/AppVersion`

}

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/Auth/login`,
};

export const PRO_PASS_UPDATE ={
  PRO_UPDATE :  `${BASE_URL}/api/Auth/Profile`,
PASS_UPDATE :  `${BASE_URL}/api/Auth/ChangePassword`,
FORGET_PASS_INITIATE : `${BASE_URL}/api/Auth/RequestPasswordReset`,
FORGET_PASS_VERIFY : `${BASE_URL}/api/Auth/VerifyResetCode`
}

export const SALES_ENDPOINTS = {
  SUMMARY: `${BASE_URL}/api/Outstanding/Sales/Summary`,
  SALES: `${BASE_URL}/api/Outstanding/Sales`,
  SALES_PDF_DATA: `${BASE_URL}/api/Outstanding/SaleBill/`,
  CLIENT_REMARK : `${BASE_URL}/api/Outstanding/Remarks`
};
