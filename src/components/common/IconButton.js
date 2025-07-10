import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import { colors } from "../../constants/ColorConstants";


export const IconButton = ({icon,bgColor,text,onpress}) => {
return (
<TouchableOpacity onPress={onpress} style={[styles.container,{backgroundColor:bgColor}]}>
<Image style={styles.icon} source={icon}/>
<Text style={styles.text}>{text}</Text>

</TouchableOpacity>

)

}
const styles = StyleSheet.create({
container:{
// flexDirection:'row',
 padding:scaleWidth(25),
        borderRadius:scaleHeight(10),
alignItems:'center',
width:'40%',
alignSelf:'center',
marginTop:scaleHeight(15),
elevation:15,

// justifyContent:

},
icon:{
    height:scaleHeight(25),
    tintColor:colors.primaryWhite,
    width:scaleWidth(25)
},
text:{
    color:colors.primaryWhite,
    fontSize:scaleFont(17),
    marginTop:scaleWidth(10)
}

})