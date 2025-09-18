import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native';

const gigsByYear = {
  2024: [
    { artist: 'Above & Beyond', date: 'November 2024', city: 'London' },
  ],
  2023: [
    { artist: 'Jan Blomqvist', date: 'November 2023', city: 'London' },
  ],
  2022: [
    { artist: 'Elderbrook', date: 'October 2023', city: 'London' },
  ],
};

export default function TimelineScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.yearsColumn}>
        {Object.keys(gigsByYear).sort((a, b) => b - a).map((year) => (
          <TouchableOpacity key={year} style={styles.yearChip}>
            <Text style={styles.yearText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.gigsColumn}>
        {Object.entries(gigsByYear).map(([year, gigs]) => (
          <View key={year}>
            <Text style={styles.yearHeader}>{year}</Text>
            {gigs.map((gig, idx) => (
              <TouchableOpacity key={idx} style={styles.gigCard}>
                <Text style={styles.gigArtist}>{gig.artist}</Text>
                <Text style={styles.gigMeta}>{gig.date}</Text>
                <Text style={styles.gigMeta}>{gig.city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#fff' },
  yearsColumn: { width: 60, backgroundColor: '#f5f5f5', alignItems: 'center', paddingTop: 24 },
  yearChip: { backgroundColor: '#0B1533', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 12 },
  yearText: { color: '#fff', fontWeight: 'bold' },
  gigsColumn: { flex: 1, padding: 16 },
  yearHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  gigCard: { backgroundColor: '#f0f0f0', borderRadius: 12, padding: 16, marginBottom: 12 },
  gigArtist: { fontSize: 16, fontWeight: 'bold' },
  gigMeta: { color: '#555', fontSize: 14 },
});
