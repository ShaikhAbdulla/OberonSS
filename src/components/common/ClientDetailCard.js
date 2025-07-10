import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatAmount, scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import { colors } from "../../constants/ColorConstants";
import { t } from "../../constants/utils/Localization";

export const ClientDetailCard = ({clientdata}) => {


return(
    <View style={styles.container}>
    <View style={styles.upperRow}>
    <Text style={styles.clientName}>
        {clientdata.partyName}
    </Text>
    <Text style={styles.creddays}>
       {t('credit_days')} : {clientdata.creditLimit}
    </Text>
    
    </View>
    <View style={styles.line}/>
    <View style={styles.lowerRow}>
    <View style={{bottom:scaleHeight(5)}}>
        <Text style={styles.text}>
         {t('due_amount')}
        </Text>
          <Text style={styles.value}>
          ₹{formatAmount(clientdata.dueAmount)}
        </Text>
    </View>
    <View style={{bottom:scaleHeight(5)}}>
        <Text style={styles.text}>
             {t('outstanding_amount')}
        </Text>
          <Text style={styles.value}>
          ₹{formatAmount(clientdata.netOutstandingAmount)}
        </Text>
    </View>
    </View>
    
    </View>
)


}

const styles = StyleSheet.create({
clientName:{color:colors.cardTextDark,fontSize:scaleFont(16),fontWeight:'600',width:scaleWidth(310)},
container : {alignSelf:'center',backgroundColor:colors.primaryWhite,borderRadius:scaleFont(10),elevation:10,height:'23%',margin:scaleWidth(30),width:'90%'},
creddays:{color:colors.cardTextDark,fontSize:scaleFont(14),fontWeight:'600',top:scaleHeight(5),width:scaleWidth(200)},
line:{alignSelf:'center',borderColor:colors.cardGray,borderWidth:0.5,width:'90%'},
lowerRow:{flexDirection:'row',height:'40%',justifyContent:'space-between',padding:scaleHeight(18)},
text:{color:colors.lightBlueText,fontSize:scaleFont(13),fontWeight:'500'},
upperRow:{height:'60%',padding:scaleHeight(20)},
value:{color:colors.cardTextDark,fontSize:scaleFont(17),fontWeight:'700'}




})