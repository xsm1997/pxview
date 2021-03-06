import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PXTouchable from './PXTouchable';

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});

const HeaderEncyclopediaButton = ({ onPress, color, ...restProps }) => (
  <PXTouchable onPress={onPress} {...restProps}>
    <Icon name="book" size={20} style={styles.icon} color={color || '#fff'} />
  </PXTouchable>
);

export default HeaderEncyclopediaButton;
