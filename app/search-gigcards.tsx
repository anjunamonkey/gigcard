import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchGigCardsScreen() {
  const [search, setSearch] = useState('');
  const [showFavourites, setShowFavourites] = useState(false);
  // Dummy data
  const allUsers = [
    { name: 'Alice Smith', username: 'alice', location: 'London', favourite: true },
    { name: 'Bob Johnson', username: 'bobj', location: 'Manchester', favourite: true },
    { name: 'Charlie Brown', username: 'charlie', location: 'Liverpool', favourite: false },
  ];
  const filteredUsers = allUsers.filter(u =>
    (showFavourites ? u.favourite : true) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.username.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{showFavourites ? 'Favourited GigCards' : 'Search GigCards'}</Text>
      <View style={styles.spacer} />
      <View style={styles.searchRow}>
        <Ionicons name="search" size={22} color="#888" style={{ marginLeft: 4, marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or username"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.spacerSmall} />
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, !showFavourites && styles.toggleBtnActive]}
          onPress={() => setShowFavourites(false)}
        >
          <Ionicons name="search-outline" size={18} color={!showFavourites ? '#011030' : '#888'} style={{ marginRight: 6 }} />
          <Text style={[styles.toggleText, !showFavourites && styles.toggleTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, showFavourites && styles.toggleBtnActive]}
          onPress={() => setShowFavourites(true)}
        >
          <Ionicons name="heart-outline" size={18} color={showFavourites ? '#EA4949' : '#888'} style={{ marginRight: 6 }} />
          <Text style={[styles.toggleText, showFavourites && styles.toggleTextActive]}>Favourites</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spacer} />
      <ScrollView>
        {filteredUsers.length === 0 ? (
          <Text style={styles.noResults}>{showFavourites ? 'No favourites yet.' : 'No results found.'}</Text>
        ) : (
          filteredUsers.map((user, idx) => (
            <TouchableOpacity key={idx} style={styles.resultCard} onPress={() => {/* navigate to user's gigcard */}}>
              <Text style={styles.resultName}>{user.name}</Text>
              <Text style={styles.resultUsername}>@{user.username}</Text>
              <Text style={styles.resultLocation}>{user.location}</Text>
              {user.favourite && (
                <Ionicons name="heart" size={20} color="#EA4949" style={{ position: 'absolute', top: 16, right: 16 }} />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 18 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#011030', marginTop: 12 },
  spacer: { height: 18 },
  spacerSmall: { height: 8 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    marginHorizontal: 0,
    justifyContent: 'center',
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#E3F2FD',
  },
  toggleText: {
    fontSize: 15,
    color: '#888',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#011030',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 44,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#011030',
  },
  noResults: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 32 },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#011030',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resultName: { fontSize: 17, fontWeight: 'bold', color: '#011030' },
  resultUsername: { fontSize: 15, color: '#EA4949', marginTop: 2 },
  resultLocation: { fontSize: 14, color: '#888', marginTop: 2 },
});
