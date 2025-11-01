import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BandsList from '../../components/BandsList';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../../constants/Auth';

export default function ArtistsScreen() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showAllArtists, setShowAllArtists] = useState(false); // Add this state
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [sortBy, setSortBy] = useState('lastSeen'); // 'name', 'lastSeen', 'timesSeen'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch artists data from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/artists_seen/`, {
      headers: {
        'Authorization': BASIC_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setArtists(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Genres from API data
  const genres = ['All', ...Array.from(new Set(artists.map(a => a.genre).filter(Boolean)))];

  // Favourites: top 5 by times_seen
  const favourites = [...artists]
    .sort((a, b) => b.times_seen - a.times_seen)
    .slice(0, 5)
    .map(a => ({
      ...a,
      image: a.artist_image ? { uri: a.artist_image } : require('../../assets/images/../../assets/images/above-beyond.jpg'),
      genre: a.genre || '',
      name: a.name,
      gigs: a.times_seen,
    }));

  // Recent: sort by last_seen desc, take top 3
  const recent = [...artists]
    .sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime())
    .slice(0, 3);

  // All artists from API
  const allArtists = artists.map(a => ({
    ...a,
    date: a.last_seen ? new Date(a.last_seen).toLocaleDateString('en-GB', { month: 'short', day: '2-digit' }) : '',
    timesSeen: a.times_seen,
    favourite: a.favourited === 'y',
    image: a.artist_image ? { uri: a.artist_image } : require('../../assets/images/../../assets/images/above-beyond.jpg'),
    genre: a.genre || '',
    name: a.name,
  }));

  // Reset state when tab is focused
  useFocusEffect(
    useCallback(() => {
      setSearch('');
      setSelectedGenre('All');
      setShowDetailedView(false);
      setSortBy('lastSeen');
      setSortOrder('desc');
    }, [])
  );

  const filteredArtists = allArtists.filter(artist =>
    (selectedGenre === 'All' || (artist.genre && artist.genre.toLowerCase().includes(selectedGenre.toLowerCase()))) &&
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedFilteredArtists = [...filteredArtists].sort((a, b) => {
    let aVal: string | Date | number;
    let bVal: string | Date | number;
    if (sortBy === 'name') {
      aVal = a.name.toLowerCase();
      bVal = b.name.toLowerCase();
    } else if (sortBy === 'lastSeen') {
      const parseDate = (dateStr: string) => {
        const [month, day] = dateStr.split(' ');
        const monthMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        return new Date(2025, monthMap[month], parseInt(day));
      };
      aVal = parseDate(a.date);
      bVal = parseDate(b.date);
    } else if (sortBy === 'timesSeen') {
      aVal = a.timesSeen;
      bVal = b.timesSeen;
    } else {
      aVal = a.name;
      bVal = b.name;
    }
    if (sortOrder === 'asc') {
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    } else {
      if (aVal > bVal) return -1;
      if (aVal < bVal) return 1;
      return 0;
    }
  });

  const shouldHideSections = showDetailedView || search.trim() !== '';

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }}>
        <Text style={styles.title}>Artists</Text>
        <View style={styles.spacer} />
        <View style={[styles.card, styles.headerRow]}>
          <Ionicons name="search" size={22} color="#888" style={{ marginLeft: 4, marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artists"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.spacerSmall} />
        {loading ? (
          <Text style={{ textAlign: 'center', color: '#888', fontSize: 16, marginTop: 32 }}>Loading artists...</Text>
        ) : (
          <>
            {shouldHideSections && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
                {genres.map((g) => (
                  <TouchableOpacity key={g} style={g === selectedGenre ? styles.genreChipActive : styles.genreChip} onPress={() => {
                    setSelectedGenre(g);
                    setShowFavouritesOnly(true);
                    setSortBy('lastSeen');
                  }}>
                    <Text style={g === selectedGenre ? styles.genreTextActive : styles.genreText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {!shouldHideSections && (
              <>
                <View style={styles.sectionHeadingRow}>
                  <View style={styles.sectionAccentBar} />
                  <Text style={styles.sectionTitle}>Most seen artists</Text>
                  <TouchableOpacity onPress={() => {
                    setShowDetailedView(true);
                    setShowFavouritesOnly(false);
                    setSelectedGenre('All');
                    setSortBy('timesSeen');
                  }}><Text style={styles.seeMore}>See more</Text></TouchableOpacity>
                </View>
                <View style={styles.spacerSmall} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favRow}>
                  {favourites.map((artist, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.card, styles.favCard]}
                      onPress={() => {
                        require('expo-router').useRouter().push(`/artist-detail/${artist.id}`);
                      }}
                    >
                      <Image source={artist.image} style={styles.favImage} />
                      <Text style={styles.favName}>{artist.name}</Text>
                      <Text style={styles.favGenre}>{artist.genre}</Text>
                      <View style={styles.gigCountBadge}><Text style={styles.gigCountText}>{artist.gigs} GIGS</Text></View>
                      <TouchableOpacity style={styles.viewBtn}><Text style={styles.viewBtnText}>View</Text></TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.spacerSmall} />
                <View style={styles.sectionHeadingRow}>
                  <View style={styles.sectionAccentBar} />
                  <Text style={styles.sectionSubTitle}>Most recent</Text>
                </View>
                <View style={styles.spacerSmall} />
                {recent.map((artist, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.card, styles.recentCard]}
                    onPress={() => {
                      require('expo-router').useRouter().push(`/artist-detail/${artist.id}`);
                    }}
                  >
                    <Image source={artist.image} style={styles.recentImage} />
                    <View style={styles.recentInfo}>
                      <Text style={styles.recentName}>{artist.name}</Text>
                      <Text style={styles.recentGenre}>{artist.genre}</Text>
                      <Ionicons name="chevron-forward" size={22} color="#888" style={{ position: 'absolute', right: 0, top: 18 }} />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
            <View style={styles.spacer} />
            <View style={styles.sectionHeadingRow}>
              <View style={styles.sectionAccentBar} />
              <Text style={styles.sectionTitle}>All artists</Text>
              <TouchableOpacity onPress={() => setShowDetailedView(!showDetailedView)}><Text style={styles.seeMore}>{showDetailedView ? 'See less' : 'See more'}</Text></TouchableOpacity>
            </View>
            <View style={styles.spacerSmall} />
            {!showDetailedView && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.allBandsRow}>
                {filteredArtists.map((artist, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.card, styles.allBandCard]}
                    onPress={() => {
                      require('expo-router').useRouter().push(`/artist-detail/${artist.id}`);
                    }}
                  >
                    <Image source={artist.image} style={styles.allBandImage} />
                    <View style={styles.allBandDateBadge}><Text style={styles.allBandDateText}>{artist.date.toUpperCase()}</Text></View>
                    <Text style={styles.allBandName}>{artist.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {showDetailedView && (
              <>
                <View style={styles.sortRow}>
                  <TouchableOpacity onPress={() => setSortBy('name')} style={sortBy === 'name' ? styles.sortActive : styles.sortButton}><Text style={sortBy === 'name' ? styles.sortTextActive : styles.sortText}>Name</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setSortBy('lastSeen')} style={sortBy === 'lastSeen' ? styles.sortActive : styles.sortButton}><Text style={sortBy === 'lastSeen' ? styles.sortTextActive : styles.sortText}>Date</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setSortBy('timesSeen')} style={sortBy === 'timesSeen' ? styles.sortActive : styles.sortButton}><Text style={sortBy === 'timesSeen' ? styles.sortTextActive : styles.sortText}>Times Seen</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} style={styles.sortButton}><Text style={styles.sortText}>{sortOrder === 'asc' ? '↑' : '↓'}</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowFavouritesOnly(fav => !fav)} style={showFavouritesOnly ? styles.sortActive : styles.sortButton}>
                    <Ionicons name={showFavouritesOnly ? 'heart' : 'heart-outline'} size={18} color={showFavouritesOnly ? '#EA4949' : '#888'} style={{ marginRight: 4 }} />
                    <Text style={showFavouritesOnly ? styles.sortTextActive : styles.sortText}></Text>
                  </TouchableOpacity>
                </View>
                <BandsList
                  bands={showFavouritesOnly ? sortedFilteredArtists.filter(a => a.favourite) : sortedFilteredArtists}
                  onBandPress={item => {
                    require('expo-router').useRouter().push(`/artist-detail/${item.id}`);
                  }}
                />
              </>
            )}
          </>
        )}

        {/* Full-width "See all" button - now inside ScrollView */}
        {!showDetailedView && (
          <TouchableOpacity
            style={styles.seeMoreFull}
            activeOpacity={0.85}
            onPress={() => {
              setShowDetailedView(true);
              setShowFavouritesOnly(false);
              setSelectedGenre('All');
              setSortBy('timesSeen');
            }}
          >
            <Text style={styles.seeMoreFullText}>See all</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 0 },
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1533',
    marginBottom: 0,
    textAlign: 'left',
    letterSpacing: -0.5,
    marginTop: 18,
    marginLeft: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 44,
    marginHorizontal: 18,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0', // restored light grey background
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#0B1533',
  },
  genreRow: { flexDirection: 'row', marginBottom: 0, marginHorizontal: 18 },
  genreChip: { backgroundColor: '#f0f0f0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  genreChipActive: { backgroundColor: '#0B1533', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  genreText: { color: '#666', fontWeight: 'bold' },
  genreTextActive: { color: '#fff', fontWeight: 'bold' },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22, marginBottom: 8, marginHorizontal: 18 },
  sectionAccentBar: { width: 6, height: 22, backgroundColor: '#EA4949', borderRadius: 3, marginRight: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0B1533', flex: 1 },
  sectionSubTitle: { fontSize: 15, fontWeight: 'bold', color: '#0B1533', marginBottom: 0, marginTop: 0, flex: 1 },
  seeMore: { color: '#E94F4F', fontWeight: 'bold', fontSize: 14 },
  favRow: { flexDirection: 'row', marginBottom: 0, marginHorizontal: 18 },
  favCard: { width: 220, padding: 0, marginRight: 16 },
  favImage: { width: '100%', height: 110, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  favName: { fontSize: 16, fontWeight: 'bold', color: '#0B1533', marginTop: 12, marginLeft: 16 },
  favGenre: { fontSize: 13, color: '#888', marginLeft: 16, marginBottom: 8 },
  gigCountBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#0B1533', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4 },
  gigCountText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  viewBtn: { borderColor: '#E94F4F', borderWidth: 1.5, borderRadius: 8, padding: 8, alignItems: 'center', margin: 16 },
  viewBtnText: { color: '#E94F4F', fontWeight: 'bold', fontSize: 15 },
  recentCard: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center' },
  recentImage: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ddd', marginRight: 12 },
  recentInfo: { flex: 1, justifyContent: 'center', position: 'relative' },
  recentName: { fontSize: 15, fontWeight: 'bold', color: '#0B1533' },
  recentGenre: { fontSize: 13, color: '#888', marginTop: 2 },
  allBandsRow: { flexDirection: 'row', marginTop: 8, marginBottom: 0, marginHorizontal: 18 },
  allBandCard: { width: 140, height: 160, marginRight: 16, alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: 8 },
  allBandImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 12 },
  allBandDateBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#0B1533', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  allBandDateText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  allBandName: { fontSize: 12, fontWeight: 'bold', color: '#0B1533', textAlign: 'center', marginTop: 4 },
  sortRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginHorizontal: 18 },
  sortButton: { backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  sortActive: { backgroundColor: '#0B1533', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  sortText: { color: '#666', fontWeight: 'bold' },
  sortTextActive: { color: '#fff', fontWeight: 'bold' },
  detailedHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: 18 },
  backButton: { padding: 8 },
  detailedHeaderTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B1533', flex: 1, textAlign: 'center' },
  detailedHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', marginHorizontal: 0 },
  detailedHeaderText: { flex: 1, fontWeight: 'bold', color: '#0B1533', textAlign: 'center' },
  detailedRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginHorizontal: 0 },
  detailedName: { flex: 2, fontSize: 16, color: '#0B1533' },
  detailedDate: { flex: 1, fontSize: 14, color: '#888', textAlign: 'center' },
  detailedTimes: { flex: 1, fontSize: 14, color: '#888', textAlign: 'center' },
  seeMoreFull: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: '#F7F8FA',
    borderColor: '#E94F4F',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreFullText: {
    color: '#E94F4F',
    fontWeight: '700',
    fontSize: 16,
  },
});