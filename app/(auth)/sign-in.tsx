import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-icon.png')}
        style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 24 }}
      />
      <Text style={styles.title}>Sign In</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email Address" 
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
      />
      <TouchableOpacity 
        style={styles.signInBtn} 
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./sign-up')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011030',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EA4949',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#011030',
  },
  signInBtn: {
    backgroundColor: '#EA4949',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#EA4949',
    fontSize: 16,
  },
});
