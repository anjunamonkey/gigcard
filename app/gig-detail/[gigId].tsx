import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Memory = {
  image: any;
  description?: string;
};

type GigDetail = {
  artist: string;
  venue: string;
  date: string;
  bio: string;
  memories: Memory[];
};

const GIGS: Record<string, GigDetail> = {
  'above-&-beyond-november-2024': {
    artist: 'Above & Beyond',
    venue: 'London',
    date: 'November 2024',
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    memories: [
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Amazing light show!' },
      { image: require('../../assets/images/tinlicker.jpg'), description: 'Met new friends.' },
      { image: require('../../assets/images/jan-blomqvist.jpg') },
      { image: require('../../assets/images/nish-kumar.jpg'), description: 'Afterparty at the venue.' }
    ]
  },
  'jan-blomqvist-november-2023': {
    artist: 'Jan Blomqvist',
    venue: 'London',
    date: 'November 2023',
    bio: 'Jan Blomqvist is a German vocalist, guitarist and producer. He is known for his melodic, emotional electronic music and live performances.',
    memories: [
      { image: require('../../assets/images/jan-blomqvist.jpg'), description: 'Front row experience.' },
      { image: require('../../assets/images/above-beyond.jpg') }
    ]
  },
  'elderbrook-october-2023': {
    artist: 'Elderbrook',
    venue: 'London',
    date: 'October 2023',
    bio: 'Elderbrook is a British musician, songwriter and producer. He is known for blending elements of electronic, dance and pop music.',
    memories: [
      { image: require('../../assets/images/nish-kumar.jpg'), description: 'Great crowd energy.' },
      { image: require('../../assets/images/tinlicker.jpg') }
    ]
  },
  'o2-arena-2016': {
    artist: 'Above & Beyond',
    venue: 'O2 Arena, London',
    date: '22 Jan, 2016',
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    memories: [
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Unforgettable night.' },
      { image: require('../../assets/images/jan-blomqvist.jpg') }
    ]
  }
};

export default function GigDetailScreen() {
  const { gigId } = useLocalSearchParams();
  const router = useRouter();
  const gig = GIGS[(gigId as string) || 'o2-arena-2016'];
  const rating = 4; // Example static rating, replace with dynamic if needed

  const handleViewMoreGigs = () => {
    router.push(`/timeline?artist=${encodeURIComponent(gig.artist)}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg} />
      <View style={styles.content}>
        <Text style={styles.artistName}>{gig.artist}</Text>
        <Text style={styles.venue}>{gig.venue}</Text>
        <TouchableOpacity style={styles.dateChip}>
          <Text style={styles.dateChipText}>{gig.date}</Text>
        </TouchableOpacity>
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < rating ? 'star' : 'star-outline'}
              size={22}
              color={i < rating ? '#011030' : '#EA4949'}
              style={{ marginRight: 2 }}
            />
          ))}
        </View>
        <Text style={styles.bio}>{gig.bio}</Text>
        <TouchableOpacity style={styles.allGigsBtn} onPress={handleViewMoreGigs}>
          <Text style={styles.allGigsBtnText}>View 3 more gigs</Text>
        </TouchableOpacity>
        {/* Notes section */}
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>
            {/* TODO: Replace with dynamic notes if available */}
            No notes added yet.
          </Text>
        </View>
        {/* Memories section */}
        <Text style={styles.sectionTitle}>Memories</Text>
        <View style={styles.memoriesGrid}>
          {gig.memories.map((memory, i) => (
            <View key={i} style={styles.memoryItem}>
              <View style={styles.memoryImageWrap}>
                <Image source={memory.image} style={styles.memoryImage} />
              </View>
              {memory.description ? (
                <Text style={styles.memoryDesc}>{memory.description}</Text>
              ) : null}
            </View>
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
  notesBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  notesText: {
    color: '#888',
    fontSize: 15,
  },
  memoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  memoryItem: {
    width: '48%',
    marginBottom: 16,
  },
  memoryImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginBottom: 6,
  },
  memoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  memoryDesc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: -4 },
});
