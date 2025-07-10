import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'react-native';
import { Header } from '../../components/common/Header';
import { colors } from '../../constants/ColorConstants';
import { image } from '../../constants/ImageConstants';
import { scaleFont, scaleHeight, scaleWidth } from '../../Utils';
import { t } from '../../constants/utils/Localization';
// import { FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons'; // Or use react-native-vector-icons

const AboutUsScreen = () => {
  return (
   
      <SafeAreaView style={{ flex: 1, backgroundColor:colors.primaryDarkBlue }}>
        <Header screenName={t('about_us')}/>
         <LinearGradient    colors={['white', '#D9E7F1']} //liked it
     style={styles.gradient}>

        <ScrollView contentContainerStyle={styles.container}>
        
          <Text style={styles.heading}>{t('about_us')}</Text>
          <Text style={styles.companyName}>{t('company_name')}</Text>
<View style={{flexDirection:'row',alignItems:'center', marginTop: scaleHeight(15),}}>
<Image style={styles.img} source={image.aboutUs.story}/>
          <Text style={styles.sectionTitle}> {t('our_story')}</Text>
          </View>
          <Text style={styles.paragraph}>
          {t('story_text')}
            {/* Founded in 2002, Oberon Software Solutions Pvt. Ltd. emerged from a deep understanding of the logistics industry, born from years of research and insights gathered from a diverse range of stakeholders. */}
          </Text>

<View style={{flexDirection:'row',alignItems:'center', marginTop: scaleHeight(15),}}>
<Image style={styles.img} source={image.aboutUs.mission}/>
          <Text style={styles.sectionTitle}> {t('our_mission')}</Text>
          </View>
          <Text style={styles.paragraph}>
          {t('mission_text')}
            {/* At Oberon, our mission is to empower businesses in the logistics and shipping sectors by providing tailored software solutions that enhance efficiency and facilitate seamless operations. */}
          </Text>
          

          <View style={styles.sectionRow}>
            {/* <FontAwesome name="rocket" size={16} color="#002B49" /> */}
            <View style={{flexDirection:'row',alignItems:'center', marginTop: scaleHeight(15),}}>
<Image style={styles.img} source={image.aboutUs.integrity}/>
            <Text style={styles.sectionTitle}> {t('our_values')}</Text>
            </View>
          </View>

           <View style={{flexDirection:'row',paddingVertical:scaleHeight(7)}}>
            {/* <Image style={styles.smallimg} source={image.aboutUs.innovation}/>  */}
          <Text style={styles.paragraph}>
           <Text style={styles.bold}>{t('value_innovation')}</Text> {t('innovation_text')}
          </Text>
</View>
          <View style={{flexDirection:'row',paddingVertical:scaleHeight(7)}}>
           {/* <Image style={styles.smallimg} source={image.aboutUs.collaboration}/>  */}
          <Text style={styles.paragraph}>
       <Text style={styles.bold}>{t('value_collaboration')}</Text> {t('collaboration_text')}
          </Text>
          </View>
           <View style={{flexDirection:'row',paddingVertical:scaleHeight(7)}}>
             {/* <Image style={styles.smallimg} source={image.aboutUs.integrity}/>  */}
          <Text style={styles.paragraph}>
          <Text style={styles.bold}>{t('value_integrity')}</Text> {t('integrity_text')}
          </Text>
          </View>

          <View style={styles.sectionRow}>
            {/* <Ionicons name="airplane" size={16} color="#002B49" /> */}
            <View style={{flexDirection:'row', marginTop: scaleHeight(15),}}>
            <Image style={styles.img} source={image.aboutUs.ahead}/>
            <Text style={styles.sectionTitle}> {t('looking_ahead')}</Text>
            </View>
          </View>
          <Text style={styles.paragraph}>
          {t('future_text')}
            {/* As we move forward, we aim to expand our offerings and explore new technologies. */}
          </Text>

          <View style={[styles.sectionRow,{ marginTop: scaleHeight(15),}]}>
            {/* <Entypo name="location-pin" size={16} color="#002B49" /> */}
            <Image style={styles.img} source={image.aboutUs.contact}/>
            <Text style={styles.sectionTitle}> {t('contact_us')}</Text>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:scaleHeight(10)}}>
          <Image style={styles.smallimg} source={image.dashboards.location}/>
          <Text style={styles.paragraph}> 
          {t('address')}
          {/* C/705-706, Kukreja Centre, Plot no.13, Sector 11, C.B.D. Belapur, Navi Mumbai – 400614 */}
          </Text>
          </View>
          {/* <Text style={styles.paragraph}> */}
          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:scaleHeight(10)}}>
          <Image style={styles.smallimg} source={image.aboutUs.mail}/>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('mailto:info@oberonss.com')}
            >  {t('email')}
            </Text>
            </View>
          {/* </Text> */}
          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:scaleHeight(10)}}>
          <Image style={styles.smallimg} source={image.aboutUs.phone}/>
          <Text style={styles.paragraph}>  {t('phone')}
          </Text>
          </View>
        </ScrollView>
        </LinearGradient>
      </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  bold: {
    color: '#002B49',
    fontWeight: '600',
  },
  companyName: {
    color: '#002B49',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  gradient: {
    flex: 1,
  },
  heading: {
    color: '#002B49',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  img:{height:scaleHeight(25),tintColor:colors.buttonGreen,width:scaleWidth(25)},
  link: {
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  paragraph: {
    color: '#333',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  sectionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  sectionTitle: {
    color: '#002B49',
    fontSize: scaleFont(16),
    fontWeight: '600',
    // marginTop: 16,
  },
  smallimg:{height:scaleHeight(20),tintColor:colors.buttonGreen,width:scaleWidth(20)}
});

export default AboutUsScreen;
