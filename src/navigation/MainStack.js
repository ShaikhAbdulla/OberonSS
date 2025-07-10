import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/Splash';
import { Login } from '../screens/login/Login';
import { DashboardAdmin } from '../screens/dashboard/DashboardAdmin';
import TabBar from './TabBarStack';
import { ClientBillHistory } from '../screens/clients/ClientsBillHistory';
import { ClientsScreen } from '../screens/clients/Clients';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, StatusBar } from 'react-native';
import { colors } from '../constants/ColorConstants';
import AboutUsScreen from '../screens/aboutUs/AboutUs';
import { MyBills } from '../screens/mybills/MyBills';
import SettingsScreen from '../screens/settings/Settings';
import ForceUpdateModal from '../components/module/appUpdate/AppUpdateModal';
import { ChangePassword } from '../screens/settings/changePassword/ChangePassword';
import { ProfileUpdate } from '../screens/settings/profileUpdate/ProfileUpdate';
import ForgetPassword from '../screens/login/forgetPassword/ForgetPassword';


const Stack = createNativeStackNavigator();

export default function MainStack() {
  
return (
    
    
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
   
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      {/* {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="DashboardAdmin" component={TabBar} /> 
       <Stack.Screen name="Clientss" component={ClientsScreen} />
      <Stack.Screen name="ClientBillHistory" component={ClientBillHistory} /> 
      <Stack.Screen name="AboutUs" component={AboutUsScreen} /> 
      <Stack.Screen name="MyBills" component={MyBills} /> 
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
       <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
       <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
       
    </Stack.Navigator>
    
  );
}
