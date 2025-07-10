import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import { colors } from "../../constants/ColorConstants";


export const IconButtonLong = ({onpress,icon,bgColor,text}) => {
return (
<TouchableOpacity onPress={onpress} style={[styles.container,{backgroundColor:bgColor}]}>
<Image style={styles.icon} source={icon}/>
<Text style={styles.text}>{text}</Text>

</TouchableOpacity>

)

}
const styles = StyleSheet.create({
container:{
alignItems:'center',
 alignSelf:'center',
        borderRadius:scaleHeight(10),
elevation:15,
flexDirection:'row',
justifyContent:'center',
marginTop:scaleHeight(15),
padding:scaleWidth(17),
width:'85%'

},
icon:{
    height:scaleHeight(18),
    tintColor:colors.primaryWhite,
    width:scaleWidth(18)
},
text:{
    color:colors.primaryWhite,
    fontSize:scaleFont(15),
    marginLeft:scaleWidth(10)
}

})