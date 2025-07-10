import client from "../Client";
import { PRO_PASS_UPDATE } from "../Endpoint";

export const getProfileData = async (id, username) => {
  try {
    const response = await client.get(`${PRO_PASS_UPDATE.PRO_UPDATE}/${id}/${username}`);
    return response.data;
  } catch (error) {
  }
};


export const updateProfile = async (payload) => {

  try {
    const response = await client.post(PRO_PASS_UPDATE.PRO_UPDATE, payload);
    return response;
  } catch (error) {
    return error

  }

};


export const updatePassword = async (payload) => {
  try {
    const response = await client.post(PRO_PASS_UPDATE.PASS_UPDATE, payload);
    return response;
  } catch (error) {
    return error
  }

};

export const forgetPassInitiate = async (payload) => {

  try {
    const response = await client.post(PRO_PASS_UPDATE.FORGET_PASS_INITIATE, payload);
    return response;
  } catch (error) {
    return error

  }

};

export const forgetPassVerify = async (payload) => {

  try {
    const response = await client.post(PRO_PASS_UPDATE.FORGET_PASS_VERIFY, payload);
    return response;
  } catch (error) {
    return error

  }

};