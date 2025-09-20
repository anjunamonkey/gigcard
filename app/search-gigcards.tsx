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
        <TouchableOpacity
          style={styles.heartFilterBtn}
          onPress={() => setShowFavourites(!showFavourites)}
        >
          <Ionicons
            name={showFavourites ? "heart" : "heart-outline"}
            size={22}
            color={showFavourites ? "#EA4949" : "#888"}
          />
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
        {/* Invite to create GigCard tile */}
        <TouchableOpacity style={styles.inviteTile} activeOpacity={0.85} onPress={() => {/* handle invite action */}}>
          <View style={styles.inviteTileContent}>
            <Ionicons name="person-add-outline" size={28} color="#EA4949" style={{ marginRight: 14 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.inviteTileTitle}>Invite a Friend</Text>
              <Text style={styles.inviteTileDesc}>Invite someone to create their own GigCard and join the community.</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 18 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0B1533', marginTop: 12, marginBottom: 8 },
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
  inviteTile: {
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EA4949',
  },
  inviteTileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inviteTileTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#EA4949',
    marginBottom: 2,
  },
  inviteTileDesc: {
    fontSize: 14,
    color: '#011030',
    opacity: 0.7,
    flexWrap: 'wrap',
  },
});
