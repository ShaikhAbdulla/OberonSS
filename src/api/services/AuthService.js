// src/api/services/authService.js

// import client from '../client';
import client from '../Client';
import { AUTH_ENDPOINTS } from '../Endpoint';
import { removeToken, storeToken, storeUserData } from '../TokenManager';


export const loginUser = async (payload) => {
  try {
    const response = await client.post(AUTH_ENDPOINTS.LOGIN, payload);
    const token = response?.data?.token;
    if (token) {
      const userDataWithUsername = {
        ...response.data,
        username: payload.username,
      };

      await storeToken(token);
      await storeUserData(userDataWithUsername)
    }

    return response;
  } catch (error) {

    return error

  }

};

export const logoutUser = async () => {
  await removeToken();
};
