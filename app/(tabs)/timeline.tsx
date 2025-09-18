import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const gigsByYear = {
  2024: [
    { artist: 'Above & Beyond', date: 'November 2024', city: 'London' },
  ],
  2023: [
    { artist: 'Jan Blomqvist', date: 'November 2023', city: 'London' },
  ],
  2022: [
    { artist: 'Elderbrook', date: 'October 2022', city: 'London' },
  ],
};

export default function TimelineScreen() {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  type Gig = { artist: string; date: string; city: string };
  type YearKey = keyof typeof gigsByYear;

  const years = Object.keys(gigsByYear).sort((a, b) => Number(b) - Number(a));
  // For each year, filter gigs by search
  const gigsForDisplay = years
    .filter(year => !selectedYear || selectedYear === year)
    .map(year => ({
      year,
      gigs: ((gigsByYear as Record<string, Gig[]>)[year] || []).filter((gig: Gig) =>
        gig.artist.toLowerCase().includes(search.toLowerCase()) ||
        gig.city.toLowerCase().includes(search.toLowerCase()) ||
        gig.date.toLowerCase().includes(search.toLowerCase())
      )
    }));

  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Timeline</Text>
      <View style={styles.spacer} />
      <View style={[styles.card, styles.timelineSearchRow]}>
        <Ionicons name="search" size={22} color="#888" style={{ marginLeft: 4, marginRight: 8 }} />
        <TextInput
          style={styles.timelineSearchInput}
          placeholder="Search gigs"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.spacerSmall} />
      <View style={{ height: 32, marginBottom: 0, marginTop: 0 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.timelineYearRow}
        >
          <TouchableOpacity
            key="all"
            style={!selectedYear ? styles.timelineYearChipActive : styles.timelineYearChip}
            onPress={() => setSelectedYear(null)}
          >
            <Text style={!selectedYear ? styles.timelineYearTextActive : styles.timelineYearText}>All</Text>
          </TouchableOpacity>
          {years.map((year) => (
            <TouchableOpacity
              key={year}
              style={year === selectedYear ? styles.timelineYearChipActive : styles.timelineYearChip}
              onPress={() => setSelectedYear(year)}
            >
              <Text style={year === selectedYear ? styles.timelineYearTextActive : styles.timelineYearText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.spacer} />
      <ScrollView style={styles.timelineGigsColumn} contentContainerStyle={{ paddingBottom: 80 }}>
        {gigsForDisplay.length === 0 || gigsForDisplay.every(y => y.gigs.length === 0) ? (
          <Text style={styles.noGigsText}>No gigs found.</Text>
        ) : (
          gigsForDisplay.map(({ year, gigs }) => (
            gigs.length > 0 && (
              <View key={year}>
                <View style={styles.sectionHeadingRow}>
                  <View style={styles.sectionAccentBar} />
                  <Text style={styles.yearHeader}>{year}</Text>
                  <Text style={styles.yearCount}>{gigs.length}</Text>
                </View>
                <View style={styles.spacerSmall} />
                {gigs.map((gig, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.card, styles.gigCard]}
                    onPress={() => {
                      const gigId = `${gig.artist.toLowerCase().replace(/\s+/g, '-')}-${gig.date.toLowerCase().replace(/\s+/g, '-')}`;
                      require('expo-router').useRouter().push(`/gig-detail/${gigId}`);
                    }}
                  >
                    <Text style={styles.gigArtist}>{gig.artist}</Text>
                    <Text style={styles.gigDate}>{gig.date}</Text>
                    <Text style={styles.gigCity}>{gig.city}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.spacer} />
              </View>
            )
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  timelineContainer: { flex: 1, backgroundColor: '#F7F8FA', padding: 0 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#011030',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 0,
  },
  spacer: { height: 18 },
  spacerSmall: { height: 8 },
  timelineTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1533',
    marginBottom: 0,
    textAlign: 'left',
    letterSpacing: -0.5,
    marginTop: 18,
    marginLeft: 18,
  },
  timelineSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 44,
    marginHorizontal: 18,
  },
  timelineSearchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#0B1533',
  },
  timelineYearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingVertical: 0,
    marginBottom: 0,
    marginTop: 0,
    marginHorizontal: 18,
  },
  timelineYearChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineYearChipActive: {
    backgroundColor: '#0B1533',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineYearText: { color: '#666', fontWeight: 'bold', fontSize: 15 },
  timelineYearTextActive: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  sectionHeadingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 22, 
    marginBottom: 8, 
    marginHorizontal: 0, // changed from 18 to 0 for full width
    paddingHorizontal: 0, // add horizontal padding to match other cards
  },
  sectionAccentBar: { width: 6, height: 22, backgroundColor: '#EA4949', borderRadius: 3, marginRight: 8 },
  yearHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B1533',
    flex: 1,
  },
  yearCount: {
    fontSize: 16,
    color: '#E94F4F',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  timelineGigsColumn: { flex: 1, paddingTop: 0, marginHorizontal: 18 },
  noGigsText: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 32 },
  gigCard: {
    padding: 16,
    marginBottom: 0,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E94F4F',
    marginTop: 0,
    marginHorizontal: 0,
  },
  gigArtist: { fontSize: 16, fontWeight: 'bold', color: '#0B1533' },
  gigDate: { fontSize: 14, color: '#666', marginTop: 4 },
  gigCity: { fontSize: 14, color: '#666' },
});
