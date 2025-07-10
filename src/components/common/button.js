import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/ColorConstants";
import { scaleFont, scaleHeight, scaleWidth } from "../../Utils";

export const ReusableButton = ({loading,name,onPress,bgcolor}) => {


return (

    // <View >
<TouchableOpacity onPress={onPress} style={[styles.button,{backgroundColor:bgcolor,}]}>
{loading?<ActivityIndicator color={colors.primaryWhite} size={'large'}/>:<Text style={styles.buttonText}>{name}</Text>}
</TouchableOpacity>

    // </View>
)

}

const styles = StyleSheet.create({

    button :{
        alignItems:'center',
        
        borderRadius:scaleWidth(10),
        height:scaleHeight(50),
        justifyContent:'center',
        padding:scaleHeight(12),
        top:scaleHeight(25),
        width:'100%'
    },
    buttonText:{
        color:colors.primaryWhite,
        fontSize:scaleFont(18),
        fontWeight:'bold'
    }
})