import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Memory = {
  image: any;
  description?: string;
};

type EventDay = {
  date: string;
  artists: string[];
  attended?: boolean;
  seenArtists?: string[];
};

type GigDetail = {
  title: string;
  venue: string;
  date: string;
  bio: string;
  artists: string[]; // headline + supporting
  eventType?: 'gig' | 'festival' | 'multi-day';
  lineup?: string[]; // for festivals
  days?: EventDay[]; // for multi-day festivals
  attendedArtists?: string[]; // for festivals
  memories: Memory[];
};

const GIGS: Record<string, GigDetail> = {
  'above-&-beyond-november-2024': {
    title: 'Above & Beyond Live',
    venue: 'London',
    date: 'November 2024',
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    artists: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Nish Kumar'],
    eventType: 'gig',
    memories: [
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Amazing light show!' },
      { image: require('../../assets/images/tinlicker.jpg'), description: 'Met new friends.' },
      { image: require('../../assets/images/jan-blomqvist.jpg') },
      { image: require('../../assets/images/nish-kumar.jpg'), description: 'Afterparty at the venue.' }
    ]
  },
  'festival-anjuna-2025': {
    title: 'Anjunabeats Festival',
    venue: 'O2 Arena, London',
    date: 'July 2025',
    bio: 'Anjunabeats Festival brings together top electronic artists for a multi-day celebration.',
    artists: ['Above & Beyond'],
    eventType: 'festival',
    lineup: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Elderbrook', 'Nish Kumar'],
    attendedArtists: ['Above & Beyond', 'Tinlicker', 'Elderbrook'],
    memories: [
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Unforgettable night.' },
      { image: require('../../assets/images/jan-blomqvist.jpg') }
    ]
  },
  'multi-day-festival-2025': {
    title: 'London Summer Fest',
    venue: 'Hyde Park',
    date: 'August 2025',
    bio: 'A multi-day festival with a diverse lineup.',
    artists: ['Above & Beyond', 'Tinlicker', 'Jan Blomqvist', 'Elderbrook', 'Nish Kumar'],
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
    ],
    memories: [
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Day 1 highlight.' },
      { image: require('../../assets/images/tinlicker.jpg') }
    ]
  },
  'jan-blomqvist-november-2023': {
    title: 'Jan Blomqvist Live',
    venue: 'London',
    date: 'November 2023',
    bio: 'Jan Blomqvist is a German vocalist, guitarist and producer. He is known for his melodic, emotional electronic music and live performances.',
    artists: ['Jan Blomqvist'],
    eventType: 'gig',
    memories: [
      { image: require('../../assets/images/jan-blomqvist.jpg'), description: 'Front row experience.' },
      { image: require('../../assets/images/above-beyond.jpg') }
    ]
  },
  'elderbrook-october-2023': {
    title: 'Elderbrook Live',
    venue: 'London',
    date: 'October 2023',
    bio: 'Elderbrook is a British musician, songwriter and producer. He is known for blending elements of electronic, dance and pop music.',
    artists: ['Elderbrook'],
    eventType: 'gig',
    memories: [
      { image: require('../../assets/images/nish-kumar.jpg'), description: 'Great crowd energy.' },
      { image: require('../../assets/images/tinlicker.jpg') }
    ]
  },
  'o2-arena-2016': {
    title: 'Above & Beyond at O2',
    venue: 'O2 Arena, London',
    date: '22 Jan, 2016',
    bio: 'Above & Beyond are an electronic music group consisting of English musicians/DJs Jono Grant, Tony McGuinness and Finnish musician/DJ Paavo Siljamäki. Formed in 2000, they are the owners of London-based electronic dance music labels Anjunabeats, Anjunadeep and Anjunachill, and also host a weekly radio show titled Group Therapy Radio.',
    artists: ['Above & Beyond'],
    eventType: 'gig',
    memories: [
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Unforgettable night.' },
      { image: require('../../assets/images/jan-blomqvist.jpg') }
    ]
  }
};

export default function GigDetailScreen() {
  const { gigId } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const gig = GIGS[(gigId as string) || 'o2-arena-2016'];
  const rating = 4; // Example static rating, replace with dynamic if needed

  if (!gig) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#E94F4F', fontSize: 18, margin: 40, textAlign: 'center' }}>
          Event not found. Please check your link or timeline.
        </Text>
      </View>
    );
  }

  const handleViewMoreGigs = () => {
    router.push(`/timeline?artist=${encodeURIComponent(gig.artists[0])}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg} />
      <View style={styles.content}>
        <Text style={styles.artistName}>{gig.title}</Text>
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
        {/* Show either Artists or Festival Lineup */}
        {gig.eventType === 'festival' && gig.lineup ? (
          <>
            <Text style={styles.sectionTitle}>Festival Lineup</Text>
            <TouchableOpacity
              style={{ marginBottom: 12, backgroundColor: '#f9f9f9', borderRadius: 8, padding: 12, alignSelf: 'flex-start' }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: '#0B1533', fontWeight: 'bold', fontSize: 15 }}>
                You saw {gig.attendedArtists ? gig.attendedArtists.length : 0}/{gig.lineup.length} artists
              </Text>
              <Text style={{ color: '#888', fontSize: 13 }}>Tap to view lineup</Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, minWidth: 280 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Festival Lineup</Text>
                  {gig.lineup.map((artist, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Ionicons
                        name={gig.attendedArtists && gig.attendedArtists.includes(artist) ? 'checkbox' : 'square-outline'}
                        size={22}
                        color={gig.attendedArtists && gig.attendedArtists.includes(artist) ? '#4CAF50' : '#888'}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={{ fontSize: 16 }}>{artist}</Text>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={{ marginTop: 18, backgroundColor: '#EA4949', borderRadius: 8, padding: 12, alignItems: 'center' }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Artists</Text>
            <View style={{ marginBottom: 12 }}>
              {gig.artists.map((artist, idx) => (
                <Text key={idx} style={{ color: '#0B1533', fontWeight: 'bold', fontSize: 15, marginBottom: 2 }}>{artist}</Text>
              ))}
            </View>
          </>
        )}
        {/* Multi-day festival section */}
        {gig.eventType === 'multi-day' && gig.days && (
          <>
            <Text style={styles.sectionTitle}>Festival Schedule</Text>
            {gig.days.map((day, idx) => (
              <View key={idx} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', color: '#0B1533', marginBottom: 4 }}>{day.date}</Text>
                <Text style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>
                  {day.attended ? 'Attended' : 'Not attended'}
                </Text>
                <Text style={{ fontWeight: 'bold', color: '#0B1533', marginBottom: 2 }}>Artists:</Text>
                {day.artists.map((artist, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                    <Ionicons
                      name={day.seenArtists && day.seenArtists.includes(artist) ? 'checkbox' : 'square-outline'}
                      size={18}
                      color={day.seenArtists && day.seenArtists.includes(artist) ? '#4CAF50' : '#888'}
                      style={{ marginRight: 6 }}
                    />
                    <Text style={{ color: '#0B1533', fontSize: 14 }}>{artist}</Text>
                  </View>
                ))}
                <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>
                  You saw {day.seenArtists ? day.seenArtists.length : 0}/{day.artists.length} artists
                </Text>
              </View>
            ))}
          </>
        )}
        <TouchableOpacity style={styles.allGigsBtn} onPress={handleViewMoreGigs}>
          <Text style={styles.allGigsBtnText}>View more gigs</Text>
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
