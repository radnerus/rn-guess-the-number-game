import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TitleText = props => {
  return (
    <Text {...props} style={{ ...styles.title, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});
