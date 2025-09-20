import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export default function PageTitle({ children, style, ...props }: TextProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1533',
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'left',
  },
});
