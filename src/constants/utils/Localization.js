import AsyncStorage from '@react-native-async-storage/async-storage';

// import en from '../locales/en.json';
import hi from '../../locales/hi.json';
import ur from '../../locales/ur.json';
import ar from '../../locales/ar.json';
import mr from '../../locales/mr.json';
import en from '../../locales/en.json'

const LANGUAGE_KEY = 'APP_LANGUAGE';

let currentLang = en;

export const loadLanguage = async () => {
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    setLanguage('en');
  }
};

export const setLanguage = async (langCode) => {
  switch (langCode) {
    case 'hi':
      currentLang = hi;
      break;
    case 'ur':
      currentLang = ur;
      break;
    case 'ar':
      currentLang = ar;
      break;
    case 'mr':
      currentLang = mr;
      break;
    case 'en':
    default:
      currentLang = en;
  }

  await AsyncStorage.setItem(LANGUAGE_KEY, langCode);
};

export const t = (key) => {
  return currentLang[key] || key;
};
