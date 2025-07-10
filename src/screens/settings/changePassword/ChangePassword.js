import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
// import { t } from "../../constants/utils/Localization";
import { colors } from "../../../constants/ColorConstants";
import { Header } from "../../../components/common/Header";
import { t } from "../../../constants/utils/Localization";
import { InputField } from "../../../components/common/TextInput";
import { getUserData, removeUserData } from "../../../api/TokenManager";
import { updatePassword } from "../../../api/services/Profile_passwordService";
import { ReusableButton } from "../../../components/common/button";
import { ToastMessage } from "../../../Utils";

export const ChangePassword = () => {
  const [oldPass, setOldPass] = useState('')
  const route = useRoute()
  const [newPass, setNewPass] = useState('')
  const [loader, setLoader] = useState(false)
  const { isFromLogin } = route?.params ? route?.params : false

  const [userData, setUserData] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    getUserDataa()
  }, [])

  const getUserDataa = async () => {
    const data = await getUserData()
    setUserData(data)
  }

  const changePass = async () => {
    setLoader(true)
    const params = {
      "id": userData.id,
      "userName": userData.username,
      "oldPassword": oldPass,
      "newPassword": newPass
    }


    try {
      if (newPass != '' && oldPass != '') {
        const data = await updatePassword(params)
        if (oldPass == newPass) {
          ToastMessage('Old and new password cannot be same!')
        } else {
          if (data.status == 200) {
            setLoader(true)
            if (isFromLogin) {

              await removeUserData()
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
              ToastMessage('Login with new password')
            }
            else {
              navigation.goBack()
              ToastMessage('Password changed successfully')
            }
          } else {
            setLoader(false)
          }
        }
      } else if (newPass == '' || oldPass == '') {
        ToastMessage('Fields cannot be empty')
      }
    } catch (error) {
      // Alert.alert(error)
      setLoader(false)
    } setLoader(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'right', 'left']}>
      <LinearGradient
        colors={['white', '#D9E7F1']} //liked it
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Header screenName={t('change_password')} />

          <InputField
            label={t('old') + ' ' + t('password')}
            value={oldPass}
            onChangeText={(text) => {
              setOldPass(text);

              // setUserErr(false);
            }}
            pass={true}
          />
          <InputField
            label={t('new') + ' ' + t('password')}
            value={newPass}
            onChangeText={(text) => {
              setNewPass(text);
              // setUserErr(false);
            }}
            pass={true}
          //   error={userErr}
          //   inputRef={usernameRef}
          />
          <View style={{ width: '85%', alignSelf: 'center' }}>
            <ReusableButton loading={loader} onPress={() => changePass()} name={'Change Password'} bgcolor={colors.primaryDarkBlue} />
          </View>
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