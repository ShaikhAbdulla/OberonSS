// ClientCardSkeleton.js
import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { scaleHeight } from '../../Utils';
import { colors } from '../../constants/ColorConstants';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ClientCardSkeleton = ({ count = 5, height = 100 }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[styles.card, { height }]}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              {
                height,
                transform: [{ translateX: shimmerTranslate }],
              },
            ]}
          />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf:'center',
     backgroundColor: colors.cardGray,
     borderRadius: 10,
    height:scaleHeight(90),
    marginBottom: 12,
    marginTop:scaleHeight(10),
    overflow: 'hidden',
    width:'90%'
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    opacity: 0.4,
    width: '60%',
  },
});

export default ClientCardSkeleton;
