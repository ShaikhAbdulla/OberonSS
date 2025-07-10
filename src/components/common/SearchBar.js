// components/SearchBar.js

import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { colors } from '../../constants/ColorConstants';
import { scaleFont, scaleHeight, scaleWidth } from '../../Utils';
import { image } from '../../constants/ImageConstants';

const SearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image.header.search}
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder || 'Search...'}
    
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: 25,
    elevation: 3,
    flexDirection: 'row',
    margin: scaleWidth(15),
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(4),
    width:'89%'
  },
  icon: {
    height: scaleHeight(22),
    tintColor: '#999',
    width: scaleWidth(22),
    // marginRight: 8,
  },
  input: {
    color: '#333',
    flex: 1,
    fontSize: scaleFont(15),
  },
});

export default SearchBar;
