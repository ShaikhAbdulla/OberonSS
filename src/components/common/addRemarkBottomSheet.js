import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { colors } from '../../constants/ColorConstants'; // Your color palette
import { scaleFont, scaleHeight, scaleWidth } from '../../Utils'; // Your scaling utils

const AddRemarkBottomSheet = ({data, visible, onClose, onAddRemark }) => {
  const [remark, setRemark] = useState(data);

  const handleAdd = () => {
    if (remark.trim()) {
      onAddRemark(remark);
      setRemark('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>Add Remark</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter remark"
            placeholderTextColor="#999"
            value={remark}
            onChangeText={setRemark}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Remark</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddRemarkBottomSheet;
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.buttonGreen || '#28a745',
    borderRadius: scaleHeight(8),
    marginTop: scaleHeight(15),
    paddingVertical: scaleHeight(12),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  cancel: {
    alignItems: 'center',
    marginTop: scaleHeight(10),
  },
  cancelText: {
    color: '#999',
    fontSize: scaleFont(14),
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderRadius: scaleHeight(10),
    borderWidth: 1,
    color: '#000',
    height: scaleHeight(100),
    padding: scaleHeight(12),
    textAlignVertical: 'top',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: scaleHeight(20),
    borderTopRightRadius: scaleHeight(20),
    padding: scaleHeight(20),
  },
  title: {
    color: '#333',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(15),
  },
});
