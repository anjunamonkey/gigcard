import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../../constants/Auth';


export default function TimelineScreen() {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date'); // new: sorting mode
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${API_BASE_URL}/api/usergigs/`, {
      headers: {
        'Authorization': BASIC_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Auth/API error');
        return res.json();
      })
      .then(data => {
        setGigs(Array.isArray(data.results) ? data.results : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group gigs by year
  const gigsByYear: Record<string, any[]> = {};
  gigs.forEach(gig => {
    const year = gig.gig?.date ? new Date(gig.gig.date).getFullYear().toString() : 'Unknown';
    if (!gigsByYear[year]) gigsByYear[year] = [];
    gigsByYear[year].push(gig);
  });

  const years = Object.keys(gigsByYear).sort((a, b) => Number(b) - Number(a));
  // Build display groups, apply search filter and sorting (by date or rating)
  const gigsForDisplay = years
    .filter(year => !selectedYear || selectedYear === year)
    .map(year => {
      // filter by search
      const filtered = gigsByYear[year].filter((gig: any) =>
        (gig.gig?.title && gig.gig.title.toLowerCase().includes(search.toLowerCase())) ||
        (gig.gig?.artists && gig.gig.artists.some((a: any) => a.name.toLowerCase().includes(search.toLowerCase()))) ||
        (gig.gig?.venue?.city && gig.gig.venue.city.toLowerCase().includes(search.toLowerCase())) ||
        (gig.gig?.date && gig.gig.date.toLowerCase().includes(search.toLowerCase()))
      );

      // sort according to sortBy
      const sorted = filtered.slice().sort((a: any, b: any) => {
        if (sortBy === 'rating') {
          // assume rating could be at userGig.rating or userGig.gig.rating
          const ra = (a.rating ?? a.gig?.rating ?? null);
          const rb = (b.rating ?? b.gig?.rating ?? null);
          const na = ra == null ? -1 : Number(ra);
          const nb = rb == null ? -1 : Number(rb);
          return nb - na; // descending rating
        } else {
          // sort by date descending
          const da = a.gig?.date ? new Date(a.gig.date).getTime() : 0;
          const db = b.gig?.date ? new Date(b.gig.date).getTime() : 0;
          return db - da;
        }
      });

      return { year, gigs: sorted };
    });

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
      {/* Sort controls */}
      <View style={{ height: 40, marginTop: 10, marginHorizontal: 18 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={sortBy === 'date' ? styles.timelineSortChipActive : styles.timelineSortChip}
            onPress={() => setSortBy('date')}
          >
            <Text style={sortBy === 'date' ? styles.timelineSortTextActive : styles.timelineSortText}>Sort: Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortBy === 'rating' ? styles.timelineSortChipActive : styles.timelineSortChip}
            onPress={() => setSortBy('rating')}
          >
            <Text style={sortBy === 'rating' ? styles.timelineSortTextActive : styles.timelineSortText}>Sort: Rating</Text>
          </TouchableOpacity>
        </ScrollView>
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
      {loading ? (
        <ActivityIndicator size="large" color="#EA4949" style={{ marginTop: 40 }} />
      ) : (
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
                  {gigs.map((userGig, idx) => (
                    <TouchableOpacity
                      key={userGig.id || idx}
                      style={[styles.card, styles.gigCard]}
                      onPress={() => {
                        // Use the correct gig ID for navigation
                        const gigId = userGig.gig?.id || userGig.id || idx;
                        require('expo-router').useRouter().push(`/gig-detail/${gigId}`);
                      }}
                    >
                      <Text style={styles.gigArtist}>{userGig.gig.title}</Text>
                      {/* Date and rating row */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                        <Text style={styles.gigDate}>{userGig.gig.date ? new Date(userGig.gig.date).toLocaleDateString() : ''}{userGig.gig.venue?.city ? ` · ${userGig.gig.venue.city}` : ''}</Text>
                        <View style={styles.gigRatingWrap}>
                          <Ionicons name="star" size={14} color="#E94F4F" style={{ marginRight: 6 }} />
                          <Text style={styles.gigRatingText}>
                            { (userGig.rating ?? userGig.gig?.rating ?? null) != null ? String((userGig.rating ?? userGig.gig?.rating)) : '--' }
                          </Text>
                        </View>
                      </View>
                       {userGig.gig.artists && userGig.gig.artists.length > 1 && (
                         <Text style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                           Artists: {userGig.gig.artists.map((a: any) => a.name).join(', ')}
                         </Text>
                       )}
                       {userGig.gig.gig_type === 'festival' && userGig.gig.lineup && (
                         <Text style={{ color: '#E94F4F', fontSize: 13, marginTop: 2 }}>
                           Festival: {userGig.gig.attendedArtists ? `${userGig.gig.attendedArtists.length}/${userGig.gig.lineup.length} artists seen` : `${userGig.gig.lineup.length} artists`}
                         </Text>
                       )}
                       {userGig.gig.gig_type === 'multi-day' && userGig.gig.days && (
                         <Text style={{ color: '#E94F4F', fontSize: 13, marginTop: 2 }}>
                           Multi-day: {userGig.gig.days.filter((d: any) => d.attended).length}/{userGig.gig.days.length} days attended
                         </Text>
                       )}
                    </TouchableOpacity>
                  ))}
                  <View style={styles.spacer} />
                </View>
              )
            ))
          )}
        </ScrollView>
      )}
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
  timelineSortChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineSortChipActive: {
    backgroundColor: '#0B1533',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineSortText: { color: '#666', fontWeight: '600', fontSize: 13 },
  timelineSortTextActive: { color: '#fff', fontWeight: '600', fontSize: 13 },
  gigRatingWrap: { flexDirection: 'row', alignItems: 'center' },
  gigRatingText: { color: '#E94F4F', fontSize: 14, fontWeight: '700' },
});
