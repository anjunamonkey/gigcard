import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Gig = { year: number; venue: string };
type Artist = {
  name: string;
  seen: number;
  bio: string;
  gigs: Gig[];
  memories: string[];
};

const ARTISTS: Record<string, Artist> = {
  'above-beyond': {
    name: 'Above & Beyond',
    seen: 5,
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    gigs: [
      { year: 2024, venue: 'Finsbury Park' },
      { year: 2024, venue: 'Alexandra Palace' },
      { year: 2023, venue: 'O2 Arena' },
    ],
    memories: ["#191919", "#888888", "#cccccc", "#ededed"]
  },
  'jan-blomqvist': {
    name: 'Jan Blomqvist',
    seen: 1,
    bio: 'Jan Blomqvist is a German vocalist, guitarist and producer. He is known for his melodic, emotional electronic music and live performances.',
    gigs: [
      { year: 2023, venue: 'London' }
    ],
    memories: ["#222", "#aaa", "#ccc", "#eee"]
  },
  'elderbrook': {
    name: 'Elderbrook',
    seen: 1,
    bio: 'Elderbrook is a British musician, songwriter and producer. He is known for blending elements of electronic, dance and pop music.',
    gigs: [
      { year: 2023, venue: 'London' }
    ],
    memories: ["#333", "#bbb", "#ddd", "#fff"]
  },
  'tinlicker': {
    name: 'Tinlicker',
    seen: 2,
    bio: 'Tinlicker is a Dutch electronic music act and producer duo. Their sound blends progressive house, trance, and melodic techno.',
    gigs: [],
    memories: ["#444", "#bbb", "#ddd", "#fff"]
  },
  'nish-kumar': {
    name: 'Nish Kumar',
    seen: 0,
    bio: 'Nish Kumar is a British stand-up comedian and radio presenter.',
    gigs: [],
    memories: ["#555", "#bbb", "#ddd", "#fff"]
  }
};

export default function ArtistDetailScreen() {
  const { artistId } = useLocalSearchParams();
  const router = useRouter();
  const artist = ARTISTS[(artistId as string) || 'above-beyond'];
  if (!artist) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: '#E94F4F', fontWeight: 'bold', fontSize: 18 }}>Artist not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg} />
      <View style={styles.content}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.seen}>Seen {artist.seen} times</Text>
        <Text style={styles.bio}>{artist.bio}</Text>
        <Text style={styles.sectionTitle}>Gigs</Text>
        <View style={styles.gigRow}>
          {artist.gigs.map((gig: Gig, i: number) => (
            <TouchableOpacity key={i} style={styles.gigChip}>
              <Text style={styles.gigChipText}>{gig.year} - {gig.venue.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Memories</Text>
        <View style={styles.memoriesRow}>
          {artist.memories.map((color: string, i: number) => (
            <View key={i} style={[styles.memoryDot, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImg: { height: 220, backgroundColor: '#222', width: '100%' },
  content: { padding: 20 },
  artistName: { fontSize: 22, fontWeight: 'bold', color: '#0B1533', marginBottom: 4 },
  seen: { color: '#888', marginBottom: 12 },
  bio: { color: '#222', marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', color: '#0B1533', marginTop: 16, marginBottom: 8 },
  gigRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  gigChip: { backgroundColor: '#0B1533', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  gigChipText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  memoriesRow: { flexDirection: 'row', marginTop: 8 },
  memoryDot: { width: 28, height: 28, borderRadius: 14, marginRight: 10, borderWidth: 2, borderColor: '#fff', elevation: 2 },
});
