import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/images/logo-icon.png')}
        style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 24 }}
      />
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create an account to get started</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email Address" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Create a password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm password" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        secureTextEntry 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Your Location" 
        value={location} 
        onChangeText={setLocation} 
      />
      
      <View style={styles.checkboxRow}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.checkboxLabel}>
          I've read and agree with the{' '}
          <Text style={styles.link}>Terms and Conditions</Text> and the{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.signUpBtn} 
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkBack}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E94F4F',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#0B1533',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.9,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#0B1533',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    opacity: 0.9,
  },
  link: {
    color: '#0B1533',
    fontWeight: 'bold',
  },
  signUpBtn: {
    backgroundColor: '#0B1533',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#011030',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  linkBack: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 8,
  },
});
