import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import { getData, scaleFont } from '../Utils';
import { scaleFont, scaleHeight, scaleWidth } from '../../Utils';
import { image } from '../../constants/ImageConstants';
import { colors } from '../../constants/ColorConstants';
import { getUserData } from '../../api/TokenManager';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData();
      if (userData) {
        if (userData.isExistingUser) {
          setTimeout(() => navigation.replace('DashboardAdmin'), 2000)
          // navigation.replace('DashboardAdmin')
          // }
          // else{
          //     navigation.replace('Dashboard')
          // }
        } else {
          setTimeout(() => navigation.replace('Login'), 2000);
        }
      } else {
        setTimeout(() => navigation.replace('Login'), 2000);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'right', 'left']}>
    <View style={styles.container}>
      <Image style={styles.splashIMg} source={image.splash.splashIcon} />
      <Text style={styles.appName}>OberonSS</Text>

      <View style={{alignItems:'center',top:scaleHeight(100)}}>
        <Text style={{color:colors.primaryWhite,fontSize:scaleFont(15),letterSpacing:scaleWidth(2),fontWeight:'700'}}>from</Text>
        <View style={{flexDirection:'row',top:scaleHeight(5)}}>
        <Image style={{height:scaleHeight(32),width:scaleWidth(32)}} source={image.company.oberon}/>
        <View style={{borderBottomWidth:0.7,borderBottomColor:'red',
        justifyContent:'flex-end',
          left:scaleWidth(2)
        }}>
<Text
  style={{
    fontSize: scaleFont(17),
    color: colors.primaryWhite,
    alignSelf: 'flex-end',
    bottom: scaleHeight(1),
    fontWeight:'700',
    letterSpacing:scaleWidth(2.5),
  
    
   
    // transform: [{ rotate: '2deg' }] // 🔥 This tilts the text slightly
  }}
>beron</Text>
</View>
        </View>
      </View>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({

  appName: {
    bottom: scaleHeight(50),
    color: colors.primaryWhite,
    fontSize: scaleFont(27),
    fontWeight: 'bold',
    letterSpacing: scaleFont(5)
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primaryDarkBlue,
    flex: 1,
    justifyContent: 'center'
  },
  splashIMg: {
    height: scaleHeight(240),
    tintColor: colors.accentGreen,
    width: scaleWidth(240)
  }
})