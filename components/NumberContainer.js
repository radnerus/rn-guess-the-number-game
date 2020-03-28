import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/colors';
import BodyText from './BodyText';
const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <BodyText style={styles.numbers}>{props.children}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center'
  },
  numbers: {
    color: Colors.accent,
    fontSize: 22
  }
});

export default NumberContainer;
