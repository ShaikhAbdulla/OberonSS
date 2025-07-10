// components/CompanyCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scaleFont, scaleHeight, scaleWidth } from '../../Utils';
import { colors } from '../../constants/ColorConstants';
import { image } from '../../constants/ImageConstants';
import { t } from '../../constants/utils/Localization';

const CompanyCard = ({ companyName, email,profileimg,username }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>{t('hi')}, {username}</Text>
        <Image
          source={image.dashboards.userEdit} // Replace with your actual icon path
          style={styles.icon}
        />
      </View>

      <View style={styles.infoRow}>
        <View style={styles.logo}>
        <Image style={styles.profileimg} source={{uri:profileimg}}/>
          {/* <Text style={styles.logoText}>A</Text> */}
        </View>
        <View>
          <Text style={styles.company}>{companyName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({
  card: {
    alignSelf:'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: 16,
    elevation: 5,
    marginVertical: scaleHeight(25),
    padding: scaleHeight(15),
    paddingVertical:scaleHeight(25),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width:'87%'
   
  },
  company: {
    color: '#0A2E59',
    fontSize: scaleFont(18),
    fontWeight: '500',
    width:scaleWidth(200),
  },
  email: {
    color: '#555',
    fontSize: scaleFont(15),
  },
  greeting: {
    color: '#0A2E59',
    fontSize: scaleFont(22),
    fontWeight: '700',
    marginBottom:scaleHeight(15)
  },
  icon: {
    height: scaleHeight(35),
    marginBottom:scaleHeight(15),
    padding:scaleHeight(10),
    resizeMode: 'contain',
    tintColor:colors.lightBlueText,
    width: scaleWidth(35)
  },
  infoRow: {
    alignItems: 'center',
    bottom:scaleHeight(5),
    flexDirection: 'row',
    
  },
  logo: {
    alignItems: 'center',
    backgroundColor: '#DBECF9',
    borderRadius: scaleHeight(30),
    height: scaleHeight(55),
    justifyContent: 'center',
    marginRight: 12,
    width: scaleWidth(55),
  },
  logoText: {
    color: '#0A2E59',
    fontSize: scaleFont(25),
    fontWeight: '700',
  },
  profileimg:{
     height: scaleHeight(45),
    resizeMode: 'contain',
    width: scaleWidth(45),
  },
  topRow: {
    alignItems: 'center',
    borderBottomColor:colors.cardGray,
    borderBottomWidth:1,
    bottom:scaleHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(20)
  },
});
