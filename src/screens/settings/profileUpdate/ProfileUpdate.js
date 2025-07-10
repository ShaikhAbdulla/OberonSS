import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation, useRoute, useScrollToTop } from "@react-navigation/native";

import { CalculatedValueCard } from "../../components/common/calculatedValueCard";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
// import { t } from "../../constants/utils/Localization";
import { colors } from "../../../constants/ColorConstants";
import { Header } from "../../../components/common/Header";
import { t } from "../../../constants/utils/Localization";
import { InputField } from "../../../components/common/TextInput";
import { getUserData, removeUserData } from "../../../api/TokenManager";
import { getProfileData, updatePassword, updateProfile } from "../../../api/services/Profile_passwordService";
import { IconButton } from "../../../components/common/IconButton";
import { ReusableButton } from "../../../components/common/button";
import { scaleHeight, scaleWidth, ToastMessage } from "../../../Utils";
import DateTimePicker from '@react-native-community/datetimepicker';


export const ProfileUpdate = () => {
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState()
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()
  const [errors, setErrors] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profile, setProfile] = useState({
    nickName: '',
    fatherName: '',
    spouseName: '',
    alternateEmail: '',
    alternateContactNo: '',
    qualification: '',
    dateOfAnniversary: '2025-07-05T02:31:11.538Z',
  });

  useEffect(() => {
    getUserDataa()
  }, [])

  const getUserDataa = async () => {

    try {
      const data = await getUserData()
      setUserData(data)
      if (data) {
        const profileData = await getProfileData(data.id, data.username)
        if (profileData) {
          setProfile(prev => ({
            ...prev,
            ...profileData, // merge API data into state
          }));
        }
      }
    } catch (error) {
    }
  }

  const handleChange = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value,
    }));
    setVisible(true)
  };

  const validateProfile = () => {
    const newErrors = {};

    if (!profile.nickName.trim()) newErrors.nickName = 'Nickname is required';
    if (!profile.alternateEmail.includes('@')) newErrors.alternateEmail = 'Enter a valid email';
    if (profile.alternateContactNo.length !== 10) newErrors.alternateContactNo = 'Enter a valid 10-digit number';
    setErrors(newErrors);

    const keys = Object.keys(newErrors);
    if (keys.length > 0) {
      const firstErrorMessage = newErrors[keys[0]];
      if (Platform.OS === 'android') {
        ToastMessage(firstErrorMessage);
      } else {
        // For iOS, you can use another toast library or Alert
        Alert.alert('Validation Error', firstErrorMessage);
      }
      return false;
    }
    return true;
  };
  const updateProfilee = async () => {
    if (!validateProfile()) return;

    try {
      const params = {
        ...profile,
        id: userData.id,
        username: userData.username
      }
      const res = await updateProfile(params);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'right', 'left']}>
      <LinearGradient
        colors={['white', '#D9E7F1']} //liked it
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Header screenName={t('edit_profile')} />
          <ScrollView>
            <InputField
              label={t('nickname')}
              value={profile.nickName}
              onChangeText={(text) => handleChange('nickName', text)}
            //   error={userErr}
            //   inputRef={usernameRef}
            />
            <InputField
              label={t('father_name')}
              value={profile.fatherName}
              onChangeText={(text) => {
                handleChange('fatherName', text)
                // setUserErr(false);
              }}
            //   error={userErr}
            //   inputRef={usernameRef}
            />
            <InputField
              label={t('spouse_name')}
              value={profile.spouseName}
              onChangeText={(text) => {
                handleChange('spouseName', text)
                // setUserErr(false);
              }}
            //   error={userErr}
            //   inputRef={usernameRef}
            />
            <InputField
              label={t('alternate_email')}
              value={profile.alternateEmail}
              onChangeText={(text) => {
                handleChange('alternateEmail', text)
                // setUserErr(false);
              }}
            //   error={userErr}
            //   inputRef={usernameRef}
            />
            <InputField
              label={t('alternate_phone_number')}

              value={profile.alternateContactNo}
              onChangeText={(text) => {
                handleChange('alternateContactNo', text)
                // setUserErr(false);
              }}
            //   error={userErr}
            //   inputRef={usernameRef}
            />
            <InputField
              label={t('qualification')}

              value={profile.qualification}
              onChangeText={(text) => {
                handleChange('qualification', text)
                // setUserErr(false);
              }}
            //   error={userErr}
            //   inputRef={usernameRef}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <InputField
                label={t('date_of_anniversary')}

                value={profile.dateOfAnniversary || ''}
              //   onChangeText={(text) => {
              //    handleChange('qualification', text)
              //     // setUserErr(false);
              //   }}
              //   error={userErr}
              //   inputRef={usernameRef}
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={profile.dateOfAnniversary ? new Date(profile.dateOfAnniversary) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    handleChange('dateOfAnniversary', selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}


            <View style={{ height: scaleHeight(100) }}></View>
          </ScrollView>
          {visible && <View style={{ width: '85%', alignSelf: 'center', position: 'absolute', bottom: scaleWidth(50) }}>
            <ReusableButton loading={loader} onPress={() => updateProfilee()} name={'Update Profile'} bgcolor={colors.primaryDarkBlue} />
          </View>}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

})