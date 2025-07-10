import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setLanguage } from '../../../constants/utils/Localization';
import { scaleFont, scaleWidth, ToastMessage } from '../../../Utils';

const languages = [
  { label: 'English', code: 'en', letter: 'E' },
  { label: 'Hindi', code: 'hi', letter: 'ह' },
  { label: 'Urdu', code: 'ur', letter: 'ا' },
  { label: 'Arabic', code: 'ar', letter: 'ع' },
  { label: 'Marathi', code: 'mr', letter: 'म' },
];

export default function LanguageSelector({ visible, onPress }) {
  const navigation = useNavigation();

  const changeLanguage = async (code,label) => {
    await setLanguage(code);
    ToastMessage(`language changed to ${label}` )
    // Alert.alert('Language changed!', 'Restarting screen...');
    navigation.reset({ index: 0, routes: [{ name: 'DashboardAdmin' }] });
    onPress?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onPress}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <Text style={styles.heading}>Select Language</Text>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.button}
                  onPress={() => changeLanguage(lang.code,lang.label)}
                >
                <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'center',}}>
                <Text style={[styles.buttonText,{fontWeight:'800',fontSize:scaleFont(18),marginRight:scaleWidth(5)}]}>{lang.letter}</Text>
                  <Text style={styles.buttonText}>{lang.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    // flexDirection:'row',
    paddingVertical: 14,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText: {
   color: '#333',
    fontSize:scaleFont(16),
    // alignSelf:'center'
  },
  heading: {
    color: '#002b5c',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    padding: 20,
  },
});
