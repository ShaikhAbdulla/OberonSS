import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MainStack from './src/navigation/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationRef } from './src/navigation/NavigationService';
import ForceUpdateModal from './src/components/module/appUpdate/AppUpdateModal';
import { getAppVersion } from './src/api/services/AppUpdateService';
import { loadLanguage } from './src/constants/utils/Localization';


function App() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLanguage();
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    getAppVersionn()
  }, []);

  const getAppVersionn = async () => {

    const latestVersion = await getAppVersion()
    const currentVersion = '1.0.0' as string;

    if (currentVersion !== latestVersion) {
      setShowUpdateModal(true);
    }

  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer ref={navigationRef}>

        <MainStack />
        {showUpdateModal && <ForceUpdateModal
          visible={showUpdateModal}
          updateUrl="https://play.google.com/store/apps/details?id=com.instagram.android&pcampaignid=web_share"
        />}

      </NavigationContainer>

    </GestureHandlerRootView>
  );
}


export default App;
