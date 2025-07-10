import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  Modal, ScrollView, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/ColorConstants';
// import { scaleFont, scaleHeight, scaleWidth, ToastMessage } from '../../Utils';
import { scaleFont, scaleHeight, scaleWidth, ToastMessage } from '../../../Utils';
import { image } from '../../../constants/ImageConstants';
import { ReusableButton } from '../../../components/common/button';
import { useNavigation } from '@react-navigation/native';
import { t } from '../../../constants/utils/Localization';
import { forgetPassInitiate, forgetPassVerify } from '../../../api/services/Profile_passwordService';
import OTPModal from '../../../components/module/forgetPassword/otpModal';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpModal, setOtpModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [passView, setPassView] = useState(true)

  const onSubmit = async () => {
    if (!username || !newPassword) {
      ToastMessage('Fields cannot be empty');
      return;
    }
    setLoader(true)
    const param = {

      "userName": username,
      "contactNo": contact
    }
    const res = await forgetPassInitiate(param)
    if (res.status == 200) {
      setOtpModal(true);
      setLoader(false)
      ToastMessage('Otp has been sent on your mail')
    }

  };

  const verifyOtp = async (otp) => {

    const params = {
      "userName": username,
      "code": otp,
      "contactNo": contact,
      "newPassword": newPassword
    }
    const res = await forgetPassVerify(params)
    if (res.status == 200) {
      ToastMessage('Password reset Successfull!')
      navigation.replace('Login');
    }



  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.buttonTeal }} edges={['top', 'right', 'left']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1 }}>
          <View style={styles.modalViewTop}>
            <Image source={image.login.loginIcon} style={styles.logo} />
          </View>

          <View style={styles.modalViewBottom}>
            <Text style={styles.heading}>{t('forget_password') || 'Forget Password'}</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.placeholder}>{t('username') || 'Username'}</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.placeholder}>{'Contact Number'}</Text>
              <TextInput
                // secureTextEntry
                style={styles.input}
                value={contact}
                onChangeText={setContact}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.placeholder}>{t('new_password') || 'Contact number'}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  secureTextEntry={passView}
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setPassView(!passView)} style={{ position: 'absolute', right: 10, top: 13 }}><Image style={{ height: scaleHeight(20), width: scaleWidth(20) }} source={image.billCard.eye} />
                </TouchableOpacity>
              </View>
            </View>

            <ReusableButton loading={loader} name={'Send otp'} onPress={onSubmit} bgcolor={colors.buttonTeal} />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{t('back') || '← Back to Login'}</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* OTP Modal */}
      <OTPModal
        otpModal={otpModal}
        setOtpModal={setOtpModal}
        onVerify={(otp) => {
          verifyOtp(otp);
          // call your API here
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    marginTop: scaleHeight(15),
    padding: scaleHeight(15),
  },
  backBtnText: {
    color: 'white',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  heading: {
    color: 'black',
    fontSize: scaleFont(27),
    fontWeight: 'bold',
    // marginBottom: scaleHeight(10),
  },

  input: {
    backgroundColor: '#dddddd',
    borderColor: 'transparent',
    borderRadius: scaleHeight(10),
    borderWidth: 1,
    color: 'black',
    padding: scaleHeight(12),
    width: scaleWidth(320),
    // opacity: 0.4
  },
  inputContainer: {
    alignSelf: 'center',
    marginTop: scaleHeight(25)
  },
  logo: {
    alignSelf: 'center',
    height: scaleHeight(200),
    tintColor: colors.billDetailBg,
    top: scaleHeight(40),
    width: scaleWidth(200),
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#00000088',
    flex: 1,
    justifyContent: 'center',
  },
  modalViewBottom: {
    backgroundColor: colors.primaryWhite,
    borderTopLeftRadius: scaleHeight(25),
    borderTopRightRadius: scaleHeight(25),
    flex: 0.55,
    paddingHorizontal: scaleWidth(25),
    paddingTop: scaleHeight(30),
  },
  modalViewTop: {
    backgroundColor: 'transparent',
    flex: 0.50,
    justifyContent: 'center',
  },
  otpModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    padding: 20,
    width: '80%',
  },
  otpTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  placeholder: {
    color: 'black',
    fontSize: scaleFont(15.5),
    letterSpacing: scaleWidth(1),
    marginBottom: scaleHeight(10)
  },
});

export default ForgetPassword;
