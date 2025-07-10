import React from "react";
import { colors } from "../../constants/ColorConstants";
import { formatAmount, scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import { Text, View } from "react-native";

export const CalculatedValueCard = ({bgColor,text,value}) => {

return (
     <View style={{backgroundColor:bgColor,marginTop:scaleHeight(15),padding:scaleHeight(15),marginHorizontal:scaleHeight(10),borderRadius:10,alignItems:'center',justifyContent:'center',elevation:10,width:'42%'}}>
         <View style={{justifyContent:'center',alignItems:'center'}}>
         <Text style={{color:colors.primaryWhite,fontWeight:'600',letterSpacing:scaleFont(1.5),fontSize:scaleFont(11),alignSelf:'center'}}>{text}</Text>
         </View> 
          <Text style={{color:colors.primaryWhite,fontWeight:'800',fontSize:scaleFont(17)}}>₹{formatAmount(JSON.stringify(value))}</Text>
          </View>
)

}