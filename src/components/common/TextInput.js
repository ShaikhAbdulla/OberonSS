import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleFont, scaleHeight, scaleWidth } from '../../Utils';
import { image } from '../../constants/ImageConstants';

export const InputField = ({
  label,
  value,
  onChangeText,
  placeholderColor = 'black',
  error = false,
  
  inputRef,
  onSubmitEditing,
  returnKeyType = 'default',
  pass
}) => {
  const [passView,setPassView] = useState(pass?true:false)

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.placeholder, { color: error ? 'red' : placeholderColor }]}>
        {label}
      </Text>
      <View style={{flexDirection:'row'}}>
      <TextInput
        ref={inputRef}
        style={[styles.input, { borderColor: error ? 'red' : 'transparent' }]}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={passView}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
      {pass?<TouchableOpacity onPress={()=>setPassView(!passView)} style={{position:'absolute',right:10,top:13}}><Image style={{height:scaleHeight(20),width:scaleWidth(20)}} source={image.billCard.eye}/>
        </TouchableOpacity>:null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#dddddd',
    borderRadius: scaleHeight(10),
    borderWidth: 1,
    color: 'black',
    padding: scaleHeight(12),
    width: scaleWidth(320)
  },
  inputContainer: {
    alignSelf:'center',
    marginTop: scaleHeight(25)
  },
  placeholder: {
    color: 'black',
    fontSize: scaleFont(15.5),
    letterSpacing: scaleWidth(1),
    marginBottom: scaleHeight(10)
  }
});
