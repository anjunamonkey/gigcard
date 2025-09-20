import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const gigsByYear = {
  2025: [
    {
      gigId: 'festival-anjuna-2025', // match gig-detail key
      title: 'Anjunabeats Festival',
      artists: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Elderbrook', 'Nish Kumar'],
      date: 'July 2025',
      city: 'London',
      eventType: 'festival',
      lineup: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Elderbrook', 'Nish Kumar'],
      attendedArtists: ['Above & Beyond', 'Tinlicker', 'Elderbrook'],
    },
    // Add extra space above London Summer Fest
    { spacer: true },
    {
      gigId: 'multi-day-festival-2025', // match gig-detail key
      title: 'London Summer Fest',
      artists: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Elderbrook', 'Nish Kumar'],
      date: 'August 2025',
      city: 'London',
      eventType: 'multi-day',
      days: [
        {
          date: 'Aug 1, 2025',
          artists: ['Above & Beyond', 'Tinlicker'],
          attended: true,
          seenArtists: ['Above & Beyond']
        },
        {
          date: 'Aug 2, 2025',
          artists: ['Jan Blomqvist', 'Elderbrook', 'Nish Kumar'],
          attended: false,
          seenArtists: []
        }
      ]
    }
  ],
  2024: [
    {
      gigId: 'above-&-beyond-november-2024',
      title: 'Above & Beyond Live',
      artists: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Nish Kumar'],
      date: 'November 2024',
      city: 'London',
      eventType: 'gig'
    },
  ],
  2023: [
    { title: 'Jan Blomqvist Live', artists: ['Jan Blomqvist'], date: 'November 2023', city: 'London', eventType: 'gig' },
  ],
  2022: [
    { title: 'Elderbrook Live', artists: ['Elderbrook'], date: 'October 2022', city: 'London', eventType: 'gig' },
  ],
};

export default function TimelineScreen() {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  type Gig = {
    title?: string;
    artists?: string[];
    date?: string;
    city?: string;
    eventType?: 'gig' | 'festival' | 'multi-day';
    lineup?: string[];
    attendedArtists?: string[];
    days?: { date: string; artists: string[]; attended?: boolean; seenArtists?: string[] }[];
    gigId?: string;
    spacer?: boolean;
  };
  type YearKey = keyof typeof gigsByYear;

  const years = Object.keys(gigsByYear).sort((a, b) => Number(b) - Number(a));
  // For each year, filter gigs by search
  const gigsForDisplay = years
    .filter(year => !selectedYear || selectedYear === year)
    .map(year => ({
      year,
      gigs: ((gigsByYear as Record<string, Gig[]>)[year] || []).filter((gig: Gig) =>
        (gig.title && gig.title.toLowerCase().includes(search.toLowerCase())) ||
        (gig.artists && gig.artists.some(a => a.toLowerCase().includes(search.toLowerCase()))) ||
        (gig.city && gig.city.toLowerCase().includes(search.toLowerCase())) ||
        (gig.date && gig.date.toLowerCase().includes(search.toLowerCase()))
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
                  gig && gig.spacer ? (
                    <View key={idx} style={{ height: 32 }} />
                  ) : gig && gig.title ? (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.card, styles.gigCard]}
                      onPress={() => {
                        const gigId = gig.gigId || `${gig.title ? gig.title.toLowerCase().replace(/\s+/g, '-') : 'unknown'}-${gig.date ? gig.date.toLowerCase().replace(/\s+/g, '-') : 'unknown'}`;
                        require('expo-router').useRouter().push(`/gig-detail/${gigId}`);
                      }}
                    >
                      <Text style={styles.gigArtist}>{gig.title}</Text>
                      <Text style={styles.gigDate}>{gig.date || ''}</Text>
                      <Text style={styles.gigCity}>{gig.city || ''}</Text>
                      {/* Show artists for multi-artist events */}
                      {gig.artists && gig.artists.length > 1 && (
                        <Text style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                          Artists: {gig.artists.join(', ')}
                        </Text>
                      )}
                      {/* Festival/Multiday info */}
                      {gig.eventType === 'festival' && gig.lineup && (
                        <Text style={{ color: '#E94F4F', fontSize: 13, marginTop: 2 }}>
                          Festival: {gig.attendedArtists ? `${gig.attendedArtists.length}/${gig.lineup.length} artists seen` : `${gig.lineup.length} artists`}
                        </Text>
                      )}
                      {gig.eventType === 'multi-day' && gig.days && (
                        <Text style={{ color: '#E94F4F', fontSize: 13, marginTop: 2 }}>
                          Multi-day: {gig.days.filter(d => d.attended).length}/{gig.days.length} days attended
                        </Text>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View key={idx} style={[styles.card, styles.gigCard]}>
                      <Text style={{ color: '#E94F4F', fontSize: 16 }}>Event not found or missing title.</Text>
                    </View>
                  )
                ))}
                <View style={styles.spacer} />
              </View>
            )
          ))
        )}
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => require('expo-router').useRouter().push('/add-event')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    marginBottom: 18,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E94F4F',
    marginTop: 0,
    marginHorizontal: 0,
  },
  gigArtist: { fontSize: 16, fontWeight: 'bold', color: '#0B1533' },
  gigDate: { fontSize: 14, color: '#666', marginTop: 4 },
  gigCity: { fontSize: 14, color: '#666' },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EA4949',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#EA4949',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    display: 'flex',
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 36,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
});
