import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Sign In" color="#6C3577" onPress={() => navigation.replace('Main')} />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  link: {
    color: '#6C3577',
    marginTop: 16,
    textAlign: 'center',
  },
});
