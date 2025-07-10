import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/ColorConstants';
import { scaleHeight, scaleWidth } from '../../Utils';
import { t } from '../../constants/utils/Localization';



const CurvedTabBar = ({ data,state, descriptors, navigation }) => {
  const tab1 = {
  Home: require('../../assets/icons/home.png'),
  Clients: require('../../assets/icons/people.png'),
};
const tab2 = {
  Home: require('../../assets/icons/home.png'),
  MyBills: require('../../assets/icons/receipt.png'),
};
const icons = data?.roleId == '1' || data?.roleId == '2'?tab1:tab2
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);

          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Image
              source={icons[route.name]}
              style={[
                styles.icon,
                { tintColor: isFocused ? colors.primaryDarkBlue : '#aaaa' },
              ]}
              resizeMode="contain"
            />
            <Text style={{ color: isFocused ? colors.primaryDarkBlue : '#aaaa',fontWeight:'bold' }}>{t(route.name.toLowerCase())}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    elevation: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    paddingBottom: scaleHeight(1),
    paddingTop: scaleHeight(7),
    justifyContent: 'space-around',
    borderWidth:1,
    borderColor:colors.cardGray
  },
  icon: {
    height: scaleHeight(22),
    width: scaleWidth(22)
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
  },
});

export default CurvedTabBar;
