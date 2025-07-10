import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bgColor, formatAmount, scaleFont, scaleHeight, scaleWidth } from "../../../Utils";
import { colors } from "../../../constants/ColorConstants";
import { image } from "../../../constants/ImageConstants";

export const ClientCard = ({data,onpress}) => {

return (
    <TouchableOpacity onPress={()=>onpress(data?.item)} style={styles.container}>
<View style={{width:'20%'}}>
<Image style={[styles.icon,{tintColor:'grey',height:scaleHeight(30),
    width:scaleWidth(30),}]} source={image.header.profile}/>
</View>
<View style={{width:'70%'}}>
<Text style={styles.name}>{data?.item?.partyName}</Text>
<Text style={styles.desc}>₹{formatAmount(data?.item?.netOutstandingAmount)}</Text>

</View>
<View>
   <Image style={[styles.icon,{tintColor:colors.buttonGreen,transform: [{ rotate: '180deg'}],height:scaleHeight(20),
    width:scaleWidth(20)}]} source={image.header.back}/> 
</View>
    </TouchableOpacity>
)

}

const styles = StyleSheet.create({

container : {
    // flex:1,
    backgroundColor:colors.primaryWhite,
    flexDirection:'row',
    // justifyContent:'space-evenly',
    padding: scaleHeight(20),
    borderRadius:scaleHeight(10),
   width:'90%',
    elevation:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:scaleHeight(15),
    height:scaleHeight(90)
},
desc:{
     color:colors.cardTextDark,
    fontSize:scaleFont(14),
    // fontWeight:'600'
},
icon:{
    // height:scaleHeight(25),
    // width:scaleWidth(25),
    tintColor:colors.primaryWhite
},
name:{
    color:colors.cardTextDark,
    fontSize:scaleFont(15),
    fontWeight:'600'
}

})