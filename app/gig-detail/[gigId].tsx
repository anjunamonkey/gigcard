import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type GigDetail = {
  artist: string;
  venue: string;
  date: string;
  bio: string;
  memories: string[];
};

const GIGS: Record<string, GigDetail> = {
  'above-&-beyond-november-2024': {
    artist: 'Above & Beyond',
    venue: 'London',
    date: 'November 2024',
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    memories: ["#191919", "#888888", "#cccccc", "#ededed"]
  },
  'jan-blomqvist-november-2023': {
    artist: 'Jan Blomqvist',
    venue: 'London',
    date: 'November 2023',
    bio: 'Jan Blomqvist is a German vocalist, guitarist and producer. He is known for his melodic, emotional electronic music and live performances.',
    memories: ["#222", "#aaa", "#ccc", "#eee"]
  },
  'elderbrook-october-2023': {
    artist: 'Elderbrook',
    venue: 'London',
    date: 'October 2023',
    bio: 'Elderbrook is a British musician, songwriter and producer. He is known for blending elements of electronic, dance and pop music.',
    memories: ["#333", "#bbb", "#ddd", "#fff"]
  },
  'o2-arena-2016': {
    artist: 'Above & Beyond',
    venue: 'O2 Arena, London',
    date: '22 Jan, 2016',
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    memories: ["#191919", "#888888", "#cccccc", "#ededed"]
  }
};

export default function GigDetailScreen() {
  const { gigId } = useLocalSearchParams();
  const router = useRouter();
  const gig = GIGS[(gigId as string) || 'o2-arena-2016'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg} />
      <View style={styles.content}>
        <Text style={styles.artistName}>{gig.artist}</Text>
        <Text style={styles.venue}>{gig.venue}</Text>
        <TouchableOpacity style={styles.dateChip}>
          <Text style={styles.dateChipText}>{gig.date}</Text>
        </TouchableOpacity>
        <Text style={styles.bio}>{gig.bio}</Text>
        <TouchableOpacity style={styles.allGigsBtn}>
          <Text style={styles.allGigsBtnText}>All Gigs you’ve attended</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Memories</Text>
        <View style={styles.memoriesRow}>
          {gig.memories.map((color: string, i: number) => (
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
  venue: { color: '#888', marginBottom: 8 },
  dateChip: { backgroundColor: '#0B1533', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 12 },
  dateChipText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  bio: { color: '#222', marginBottom: 20 },
  allGigsBtn: { borderColor: '#E94F4F', borderWidth: 1.5, borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 16 },
  allGigsBtnText: { color: '#E94F4F', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontWeight: 'bold', color: '#0B1533', marginTop: 16, marginBottom: 8 },
  memoriesRow: { flexDirection: 'row', marginTop: 8 },
  memoryDot: { width: 28, height: 28, borderRadius: 14, marginRight: 10, borderWidth: 2, borderColor: '#fff', elevation: 2 },
});
