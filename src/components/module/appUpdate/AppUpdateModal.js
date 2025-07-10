import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { image } from '../../../constants/ImageConstants';

const ForceUpdateModal = ({ visible, updateUrl }) => {
  const handleUpdate = () => {
    Linking.openURL(updateUrl);
  };

  return (
    // <Modal statusBarTranslucent visible={visible} transparent animationType="fade">
      <View  style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Image
            source={image.company.oberon} // replace with your icon
            style={styles.icon}
          />
          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.message}>
            A new version of the app is available. Please update to continue using the latest features and security enhancements.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    //   </Modal> */}
  );
};

export default ForceUpdateModal;

const styles = StyleSheet.create({
  backdrop: {
    position:'absolute',
    // flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 30,
    height:'100%'
    
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    height: 80,
    marginBottom: 15,
    width: 80,
  },
  message: {
    color: '#444',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 10,
    padding: 25,
  },
  title: {
    color: '#002b5c',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
});
