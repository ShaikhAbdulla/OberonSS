import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { image } from '../../constants/ImageConstants';
import { formatAmount, scaleHeight, scaleWidth } from '../../Utils';
import { colors } from '../../constants/ColorConstants';
import { t } from '../../constants/utils/Localization';

const BillCard = ({ data,onView,onShare,onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const finalValue = expanded ? 0 : 60;
    Animated.timing(animatedHeight, {
      toValue: finalValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.cardWrapper}>
     <TouchableWithoutFeedback onPressIn={toggleExpand}>
  <View style={styles.card}>
    <View>
      <Text style={styles.name}>{data.billNo}</Text>
      <Text style={styles.date}>{data.billDate}</Text>
    </View>
    <View style={styles.amountPill}>
      <Text style={styles.amountText}>₹ {formatAmount(data.billAmount)}</Text>
    </View>
  </View>
</TouchableWithoutFeedback>

      <Animated.View style={[styles.expandedArea, { height: animatedHeight }]}>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={()=>onView(data)} style={styles.actionButton}>
          <Image style={styles.actionIcon} source={image.billCard.eye}/>
            <Text style={styles.actionText}>{t('view')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onShare(data)} style={styles.actionButton}>
          <Image style={styles.actionIcon} source={image.billCard.share}/>
            <Text style={styles.actionText}>{t('share')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onDelete(data)} style={styles.actionButton}>
          <Image style={styles.actionIcon} source={image.billCard.download}/>
            <Text style={styles.actionText}>{t('download')}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  actionButton: {
    alignItems:'center',
    backgroundColor: '#e0f1f1',
    borderRadius: 6,
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 10
  },
  actionIcon:{
height:scaleHeight(15),
tintColor:colors.buttonTeal,
width:scaleWidth(15)
  },
  actionText: {
    color: '#007777',
    fontWeight: '500',
    marginLeft:scaleWidth(5)
    
  },
  amountPill: {
    backgroundColor: '#2ca59d',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  amountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  date: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  expandedArea: {
    backgroundColor: colors.primaryWhite,
    overflow: 'hidden',
  },
  name: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: '600',
  }
});
