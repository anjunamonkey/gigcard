import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';

const genres = ['All', 'Dance', 'Pop', 'Rock', 'Ambient', 'Metal'];
const favourites = [
  { name: 'Above & Beyond', genre: 'Trance', gigs: 5, image: require('../../assets/abnb.jpg') },
  { name: 'Tinlicker', genre: 'Melodic House', gigs: 2, image: require('../../assets/tinlicker.jpg') },
];
const recent = [
  { name: 'Jan Blomqvist', genre: 'Dance, Electronica', image: require('../../assets/jan.jpg') },
  { name: 'Nish Kumar', genre: 'Comedian', image: require('../../assets/nish.jpg') },
];

const allBands = [
  { name: 'Above & Beyond', lastSeen: '2024-11-15', timesSeen: 5, genre: 'Trance' },
  { name: 'Tinlicker', lastSeen: '2024-10-20', timesSeen: 2, genre: 'Melodic House' },
  { name: 'Jan Blomqvist', lastSeen: '2023-11-10', timesSeen: 3, genre: 'Dance, Electronica' },
  { name: 'Nish Kumar', lastSeen: '2023-09-05', timesSeen: 1, genre: 'Comedian' },
  { name: 'Elderbrook', lastSeen: '2022-10-12', timesSeen: 4, genre: 'House' },
  { name: 'Avicii', lastSeen: '2021-08-30', timesSeen: 6, genre: 'Pop' },
  { name: 'Calvin Harris', lastSeen: '2024-07-14', timesSeen: 7, genre: 'Pop' },
  { name: 'David Guetta', lastSeen: '2023-12-01', timesSeen: 8, genre: 'EDM' },
  { name: 'Armin van Buuren', lastSeen: '2024-05-22', timesSeen: 9, genre: 'Trance' },
  { name: 'Kygo', lastSeen: '2024-08-18', timesSeen: 3, genre: 'Tropical House' },
];

export default function BandsScreen({ navigation }) {
  console.log('BandsScreen component rendered');

  const [showAllBands, setShowAllBands] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastSeen');
  const [reverseSort, setReverseSort] = useState(false);

  console.log('BandsScreen render, showAllBands:', showAllBands);

  const filteredBands = useMemo(() => allBands.filter(band => band.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

  const sortedBands = useMemo(() => {
    return [...filteredBands].sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'name') {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else if (sortBy === 'lastSeen') {
        aVal = new Date(a.lastSeen);
        bVal = new Date(b.lastSeen);
      } else if (sortBy === 'timesSeen') {
        aVal = a.timesSeen;
        bVal = b.timesSeen;
      }
      if (reverseSort) {
        return aVal < bVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });
  }, [filteredBands, sortBy, reverseSort]);

  console.log('sortedBands length:', sortedBands.length);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Band View</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
        {genres.map((g) => (
          <TouchableOpacity key={g} style={g === 'All' ? styles.genreChipActive : styles.genreChip} onPress={() => console.log('Genre pressed:', g)}>
            <Text style={g === 'All' ? styles.genreTextActive : styles.genreText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Your favourites</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favRow}>
        {favourites.map((band, idx) => (
          <View key={idx} style={styles.favCard}>
            <Image source={band.image} style={styles.favImage} />
            <Text style={styles.favName}>{band.name}</Text>
            <Text style={styles.favGenre}>{band.genre}</Text>
            <Text style={styles.favGigs}>{band.gigs} GIGS</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Most recently seen</Text>
      {recent.map((band, idx) => (
        <View key={idx} style={styles.recentCard}>
          <Image source={band.image} style={styles.recentImage} />
          <View>
            <Text style={styles.recentName}>{band.name}</Text>
            <Text style={styles.recentGenre}>{band.genre}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity
        activeOpacity={0.7}
        underlayColor="#c42b2b"
        onPress={() => {
          console.log('See more pressed');
          setShowAllBands(true);
          console.log('setShowAllBands called');
        }}
        style={[styles.seeMoreButton, { zIndex: 1 }]}
      >
        <Text style={styles.seeMoreText}>See more</Text>
      </TouchableOpacity>
      {showAllBands && (
        <View>
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search bands"
            style={styles.searchInput}
          />
          <View style={styles.sortRow}>
            <TouchableOpacity onPress={() => setSortBy('name')} style={sortBy === 'name' ? styles.sortActive : styles.sortButton}>
              <Text style={sortBy === 'name' ? styles.sortTextActive : styles.sortText}>Alphabetical</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortBy('lastSeen')} style={sortBy === 'lastSeen' ? styles.sortActive : styles.sortButton}>
              <Text style={sortBy === 'lastSeen' ? styles.sortTextActive : styles.sortText}>Last Seen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortBy('timesSeen')} style={sortBy === 'timesSeen' ? styles.sortActive : styles.sortButton}>
              <Text style={sortBy === 'timesSeen' ? styles.sortTextActive : styles.sortText}>Times Seen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReverseSort(!reverseSort)} style={styles.reverseButton}>
              <Text style={styles.reverseText}>{reverseSort ? '↓' : '↑'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, { flex: 2 }]}>Artist Name</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Last Seen</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Times Seen</Text>
          </View>
          <FlatList
            data={sortedBands}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              console.log('renderItem called for:', item.name);
              return (
                <TouchableOpacity
                  style={styles.bandRow}
                  onPress={() => {
                    console.log('Navigating to artist:', item.name);
                    navigation.navigate('artist-detail', { artistId: item.name });
                  }}
                >
                  <View style={styles.bandInfo}>
                    <Text style={styles.bandName}>{item.name}</Text>
                    <Text style={styles.bandGenre}>{item.genre}</Text>
                  </View>
                  <Text style={styles.bandLastSeen}>{new Date(item.lastSeen).toLocaleDateString()}</Text>
                  <Text style={styles.bandTimes}>{item.timesSeen}</Text>
                </TouchableOpacity>
              );
            }}
            scrollEnabled={false}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  genreRow: { flexDirection: 'row', marginBottom: 16 },
  genreChip: { backgroundColor: '#f0f0f0', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16, marginRight: 8 },
  genreChipActive: { backgroundColor: '#E94F4F', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16, marginRight: 8 },
  genreText: { color: '#0B1533', fontWeight: 'bold' },
  genreTextActive: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  favRow: { flexDirection: 'row', marginBottom: 16 },
  favCard: { backgroundColor: '#0B1533', borderRadius: 16, padding: 16, alignItems: 'center', marginRight: 12, width: 180 },
  favImage: { width: 160, height: 90, borderRadius: 12, marginBottom: 8 },
  favName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  favGenre: { color: '#fff', fontSize: 14 },
  favGigs: { color: '#E94F4F', fontWeight: 'bold', marginTop: 4 },
  recentCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  recentImage: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  recentName: { fontWeight: 'bold', fontSize: 16 },
  recentGenre: { color: '#888', fontSize: 14 },
  seeMoreButton: { backgroundColor: '#E94F4F', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 20, alignSelf: 'center', marginTop: 20, minWidth: 120 },
  seeMoreText: { color: '#fff', fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 16, marginBottom: 8 },
  sortRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  sortButton: { backgroundColor: '#f0f0f0', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12 },
  sortActive: { backgroundColor: '#E94F4F', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12 },
  sortText: { color: '#0B1533', fontWeight: 'bold' },
  sortTextActive: { color: '#fff', fontWeight: 'bold' },
  reverseButton: { backgroundColor: '#0B1533', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12 },
  reverseText: { color: '#fff', fontWeight: 'bold' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' },
  headerText: { fontWeight: 'bold', fontSize: 16 },
  bandRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  bandInfo: { flex: 2 },
  bandName: { fontSize: 16, fontWeight: 'bold' },
  bandGenre: { fontSize: 14, color: '#666', marginTop: 2 },
  bandLastSeen: { fontSize: 16, flex: 1, textAlign: 'center' },
  bandTimes: { fontSize: 16, flex: 1, textAlign: 'center' },
});
