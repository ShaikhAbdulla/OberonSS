import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/ColorConstants';

import { image } from '../../constants/ImageConstants';
import { scaleHeight, scaleWidth } from '../../Utils';
import LanguageSelector from '../../components/module/settings/LanguageSelector';
import { t } from '../../constants/utils/Localization';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modal,setModal] = useState(false)

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          // TODO: Clear storage, then navigate
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

const renderRow = (label, iconName, onPress, hasSwitch = false, switchValue = false) => {
   return (<TouchableOpacity
      onPress={onPress}
      disabled={hasSwitch}
      style={styles.row}
    >
      <View style={styles.rowContent}>
        <Image source={iconName} style={{height:scaleHeight(23),width:scaleWidth(23),resizeMode:'contain',tintColor:iconName==image.dashboards.logout?'red':colors.secondaryTeal}}/>
        <Text style={styles.label}>{label}</Text>
      </View>
      {hasSwitch ? (
        <Switch
        thumbColor={colors.accentGreen}
        trackColor={{ false: '#ccc', true: colors.buttonTeal }}
          value={switchValue} onValueChange={onPress} />
      ) : (
       <Image style={{tintColor:colors.buttonGreen,transform: [{ rotate: '180deg'}],height:scaleHeight(20),
           width:scaleWidth(20)}} source={image.header.back}/>
     
      )}
    </TouchableOpacity>)
};

  return (<SafeAreaView style={{flex:1,backgroundColor:colors.primaryDarkBlue}} edges={['top','right','left']}>
   <LinearGradient
        //   colors={['#e0f7fa', '#f1f8ff']} // replace with your desired colors
        // colors={['#004e92', '#000428']}
        // colors={['#e0f7fa', '#f1f8ff']}
        // colors={['#004e92', '#000428']}'
        // colors={['#008080', '#ffffff']} //liked it
        colors={['white', '#D9E7F1']} //liked it
    
    // colors={['#ffffff', '#e4ecf7']} //liked it
    // colors={['#DCEFFF', '#F8FCFF']} ok
    // colors={['#F7F8FA', '#E3E6EB']}
    // colors={['#E6F3F2', '#FFFFFF']}
    
          style={{ flex: 1 }}
        >
  <Header screenName={t('settings')}/>
    <ScrollView contentContainerStyle={styles.container}>
     <LanguageSelector visible={modal} onPress={()=>setModal(false)}/>
      {renderRow(t('edit_profile'), image.dashboards.userEdit, () => navigation.navigate('ProfileUpdate'))}
      {renderRow(t('change_password'), image.setting.changePassword, () => navigation.navigate('ChangePassword'))}
      {renderRow(t('dark_mode'), image.setting.mode, toggleDarkMode, true, isDarkMode)}
      {renderRow(t('language'), image.setting.language, () => setModal(!modal))}
      {renderRow(t('app_version') , image.setting.version, () => {}, false)} 
      <View>
      {renderRow(t('logout'), image.dashboards.logout, confirmLogout)}
      </View>
     
    </ScrollView>
    </LinearGradient>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    // backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    color: '#333',
    fontSize: 16,
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
});
