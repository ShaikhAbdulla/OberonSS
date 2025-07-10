import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardAdmin } from '../screens/dashboard/DashboardAdmin';
import { ClientsScreen } from '../screens/clients/Clients';
import CurvedTabBar from '../components/common/CurvedTabBar';
import { getToken, getUserData } from '../api/TokenManager';
import { Login } from '../screens/login/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyBills } from '../screens/mybills/MyBills';

const Tab = createBottomTabNavigator();

export default function TabBar() {
  const [userData, setUserData] = useState()

  useEffect(() => {
    getUserDataa()
  }, [])

  const getUserDataa = async () => {
    const data = await getUserData()
    const token = await getToken()
    setUserData(data)
  }
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Tab.Navigator
        tabBar={(props) => <CurvedTabBar data={userData} {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={DashboardAdmin} />
        {userData?.roleId == '1' || userData?.roleId == '2' ? <Tab.Screen name="Clients" component={ClientsScreen} /> :
          <Tab.Screen name="MyBills" component={MyBills} />
        }
      </Tab.Navigator>
    </SafeAreaView>
  );
}
