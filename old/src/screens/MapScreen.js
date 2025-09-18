import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const locations = [
  {
    level: 'country',
    name: 'United Kingdom',
    cities: 3,
    venues: 15,
    gigs: 16,
  },
  {
    level: 'city',
    name: 'London',
    venues: 5,
    gigs: 10,
  },
];

export default function MapScreen() {
  const [view, setView] = useState('country');
  return (
    <ScrollView style={styles.container}>
      {locations.map((loc, idx) => (
        <View key={idx} style={styles.mapCard}>
          <Text style={styles.mapTitle}>{loc.name}</Text>
          <Text style={styles.mapMeta}>
            {loc.level === 'country'
              ? `${loc.cities} Cities  |  ${loc.venues} Venues  |  ${loc.gigs} Gigs`
              : `${loc.venues} Venues  |  ${loc.gigs} Gigs`}
          </Text>
          <View style={styles.mapImage} />
          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={styles.detailsText}>See details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  mapCard: { backgroundColor: '#f5f5f5', borderRadius: 16, padding: 20, marginBottom: 24 },
  mapTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  mapMeta: { color: '#888', marginBottom: 12 },
  mapImage: { backgroundColor: '#e0e0e0', height: 180, borderRadius: 12, marginBottom: 12 },
  detailsBtn: { backgroundColor: '#E94F4F', borderRadius: 8, padding: 12, alignItems: 'center' },
  detailsText: { color: '#fff', fontWeight: 'bold' },
});
