import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Error storing token', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Error getting token', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Error removing token', e);
  }
};

export const storeUserData = async (data) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error storing user data', e);
  }
};

export const getUserData = async () => {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Error getting user data', e);
    return null;
  }
};


export const removeUserData = async () => {
  try {
    await removeToken();
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Error removing user data', e);
  }
};
