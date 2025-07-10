import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/ColorConstants";
import { image } from "../../constants/ImageConstants";
import { scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import { useNavigation } from "@react-navigation/native";

export const Header = ({menu,onpress,screenName}) => {
const navigation = useNavigation()

return (
<View style={styles.container}>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
{menu==true?<TouchableOpacity onPress={onpress}>
<Image style={styles.icon} source={image.header.menu}/>
</TouchableOpacity>
:<TouchableOpacity onPress={()=>navigation.goBack()}>
<Image style={styles.icon} source={image.header.back}/>
</TouchableOpacity>

}
<Text style={styles.screenName}>{screenName}</Text>
</View>

<View style={styles.logo}>
<Image style={{height:scaleHeight(35),width:scaleWidth(50),resizeMode:'contain'}} source={image.company.oberon}/>
</View>
</View>)

}

const styles = StyleSheet.create({

container:{
    alignItems:'center',
    backgroundColor: colors.primaryDarkBlue,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:scaleHeight(10)
},
icon:{
    height:scaleHeight(25),
    tintColor:colors.primaryWhite,
    width:scaleWidth(25)
},
 logo: {
    alignItems: 'flex-end',
    borderRadius: scaleHeight(30),
    height: scaleHeight(32),
    justifyContent: 'center',
    width: scaleWidth(70),
  },
  screenName: {
    color:colors.primaryWhite,
    fontSize:scaleFont(20),
    fontWeight:'600',
    left:scaleWidth(15),
    
        // marginRight:scaleWidth(150)

  }

})