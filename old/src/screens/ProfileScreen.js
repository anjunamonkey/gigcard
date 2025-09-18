import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileCard}>
        <Text style={styles.profileName}>Luc</Text>
        <Text style={styles.profileEmail}>luc@email.com</Text>
        <Text style={styles.profileLocation}>London, United Kingdom</Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  profileCard: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 24 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  profileEmail: { color: '#888', marginBottom: 4 },
  profileLocation: { color: '#0B1533', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#E94F4F', borderRadius: 8, padding: 16, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
