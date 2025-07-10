import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { ReusableButton } from '../../common/button';
import { t } from '../../../constants/utils/Localization';
import { colors } from '../../../constants/ColorConstants';
import { scaleFont, scaleHeight, scaleWidth } from '../../../Utils';
// import { colors } from '../../constants/ColorConstants';
// import { ReusableButton } from '../../components/common/button';
// import { t } from '../../constants/utils/Localization';

export default function OTPModal({ otpModal, setOtpModal, onVerify }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length === 6) {
      onVerify(finalOtp);
    } else {
      alert('Please enter complete OTP');
    }
  };

  return (
    <Modal visible={otpModal} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.otpModal}>
          <Text style={styles.otpTitle}>{t('enter_otp') || 'Enter OTP'}</Text>

          <View style={styles.otpInputs}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <ReusableButton
              name={t('verify_otp') || 'Verify OTP'}
              onPress={verifyOtp}
              bgcolor={colors.buttonTeal}
            />
          </View>

          <TouchableOpacity onPress={() => setOtpModal(false)} style={{ marginTop: scaleHeight(30) }}>
            <Text style={styles.closeText}>{t('cancel') || 'Cancel'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
closeText: {
    color: 'red',
    fontSize: 16
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center'
  },
  otpBox: {
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 1,
    color: 'black',
    fontSize: scaleFont(17),
    height: scaleHeight(45),
    marginHorizontal: scaleWidth(4),
    textAlign: 'center',
    width: scaleWidth(40)
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  otpModal: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: scaleWidth(350)
  },
  otpTitle: {
    fontSize: scaleFont(20),
    fontWeight: '600',
    marginBottom: scaleHeight(25),
    top:scaleHeight(5)
  }
});
