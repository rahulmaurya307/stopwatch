import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './CustomButton.styles';

export const CustomButton = props => {
  const {title, color, background, onPress, disabled} = props;
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, {backgroundColor: background}]}
      activeOpacity={disabled ? 1 : 0.7}>
      <View
        style={[
          styles.buttonBorder,
          {backgroundColor: disabled ? color : 'cyan'},
        ]}>
        <Text style={[styles.buttonTitle, {backgroundColor: color}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
