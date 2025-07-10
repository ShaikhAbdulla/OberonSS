import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { image } from '../../../constants/ImageConstants';
import { colors } from '../../../constants/ColorConstants';
import { scaleFont, scaleHeight, scaleWidth } from '../../../Utils';
import { useNavigation } from '@react-navigation/native';
import { t } from '../../../constants/utils/Localization';

const { width } = Dimensions.get('window');

export default function SidebarModal({ userData, visible, closeDrawer, navigateTo, logout }) {
  const navigation = useNavigation()

  const sideBarData = [
    {
      image: image.dashboards.home, name: t('home'), navigateTo: ''
    },
    {
      image: image.dashboards.clients, name: t('clients'), navigateTo: 'Clientss'
    },
    {
      image: image.dashboards.aboutus, name: t('about_us'), navigateTo: 'AboutUs'
    }, {
      image: image.dashboards.logout, name: t('logout'), navigateTo: ''
    }

  ]

  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent animationType="none" visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={closeDrawer}
      >
        <Animated.View
          style={[
            styles.drawerContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
        <TouchableOpacity style={{position:'absolute',top:15,right:10}} onPress={closeDrawer}>
        <Image style={{height:scaleHeight(25),width:scaleWidth(25),tintColor:colors.primaryWhite,}} source={image.dashboards.TabBack}/>
        </TouchableOpacity>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <Image
              source={{uri:userData?.profileImage}} // Your image path
              style={styles.avatar}
            />
            <Text numberOfLines={1} style={styles.username}>{userData?.companyName}</Text>
          </View>

          {/* Menu Items */}
          {sideBarData.map((data) => {
            return <TouchableOpacity  onPress={() => {
                // navigateTo('Home');
                {data.name==t('logout')?logout(): (navigation.navigate(data.navigateTo),closeDrawer())}
               
                
              }} key={data.name}
              style={styles.menuItem}>
             <View
              style={{flexDirection:'row',alignItems:'center'}}
             
            >
            <Image style={{height:scaleHeight(17),width:scaleWidth(17),resizeMode:'contain',tintColor:colors.primaryWhite}} source={data.image}/>
              <Text style={styles.menuText}>{data.name}</Text>
            </View>
            </TouchableOpacity>
          })}
          {/* App Version */}
          <View style={styles.version}>
            <Text style={{ color: '#aaa' }}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 35,
    height: 100,
    marginBottom: 10,
    resizeMode:'contain',
    width: 100,
    // tintColor: colors.primaryWhite,
  },
  drawerContainer: {
    width: 250,
    backgroundColor: colors.primaryDarkBlue,
    paddingTop: 50,
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  menuItem: {
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryWhite,
    width: '100%',


    // height:'10%'
    paddingVertical: scaleHeight(20),
    alignItems:'center'
  },
  menuText: {
    color: colors.primaryWhite,
    fontSize: scaleFont(17),
    marginLeft:scaleWidth(10)
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    flexDirection: 'row',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor:'#DBECF9',
    borderRadius:10,
    marginBottom: 30,
    marginTop:scaleHeight(10)
  },
  username: {
    alignSelf:'center',
    bottom:scaleHeight(10),
    color: colors.primaryDarkBlue,
    fontSize: scaleFont(15),
    fontWeight: 'bold',
    width:scaleWidth(165)
  },
  version: {
    bottom: 30,
    left: 20,
    position: 'absolute',

  },
});
