import { Alert, ToastAndroid } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
// import { partyData } from './dummyData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeUserData } from './api/TokenManager';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define a base width and height (from a standard mobile design, e.g., iPhone 12)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scaleWidth = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;


export const scaleHeight = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;


export const scaleFont = (size) => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export const ToastMessage = (message, duration = ToastAndroid.SHORT) => {
  ToastAndroid.show(message, duration);
};

export const bgColor = (status) => {
  const color = status == 'Invited' ? 'grey' : status == 'Accepted' ? '#FF8C00' : 'red'
  return color
}

// export const findUsername = (username) => {
//     return partyData.some(party => party.email.toLowerCase() === username.toLowerCase());
//   };
//   export const getUserData = (username) => {
//     return partyData.filter(party => party.email.toLowerCase() === username.toLowerCase());
//   };


// Store data
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error('Error storing data:', e);
    return false;
  }
};

// Get data
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return null;
  }
};

export const formatCurrency = (num) => {
  if (!num && num !== 0) return '';
  return '₹ ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const filterData = (data, query) => {
  return data.filter((item) =>
    item.partyName.toLowerCase().includes(query.toLowerCase())
  );
};

export const sumOfValues = (data, val) => {
  let calculatedvalue = 0

  for (let i = 0; i < data.length; i++) {
    if (val == 'net') {
      calculatedvalue += parseFloat(data[i].netOutstandingAmount);

    } else {
      calculatedvalue += parseFloat(data[i].dueAmount);
    }


  }

  return calculatedvalue
}


export const formatAmount = (value) => {
  const num = Number(value);
  if (isNaN(num)) return '0';

  if (num >= 100000) {
    return `${(num / 100000).toFixed(2)}L`;
  }
  return num.toLocaleString('en-IN'); // fallback for numbers below 1 lakh
};