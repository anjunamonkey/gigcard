import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../../constants/Auth';

// Add this temporarily for debugging:
console.log('GigDetail screen loaded');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImg: {
    height: 220,
    backgroundColor: '#EEE',
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    padding: 18,
  },
  artistName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1533',
    marginBottom: 6,
  },
  venue: {
    fontSize: 18,
    color: '#EA4949',
    marginBottom: 8,
  },
  dateChip: {
    backgroundColor: '#EA4949',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  dateChipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA4949',
    marginBottom: 8,
    marginTop: 18,
  },
  allGigsBtn: {
    backgroundColor: '#011030',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 18,
  },
  allGigsBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notesBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  notesText: {
    color: '#444',
    fontSize: 15,
  },
});

const gigs = {
  'jan-blomqvist-2023': {
    memories: [
      { image: require('../../assets/images/jan-blomqvist.jpg'), description: 'Front row experience.' },
      { image: require('../../assets/images/above-beyond.jpg') },
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
      { image: require('../../assets/images/above-beyond.jpg'), description: 'Unforgettable night.' }
    ]
  }
};

const GigDetail = () => {
  const { gigId } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [userGig, setUserGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gigId) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE_URL}/api/usergigs/${gigId}/`, {
      headers: {
        'Authorization': BASIC_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setUserGig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gigId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EA4949" style={{ marginTop: 40 }} />
      </View>
    );
  }

  // Fallback to hardcoded gigs if API fails or gigId is missing
  if (!userGig || !userGig.gig) {
    const fallbackGig = gigId && gigs[gigId as string];
    if (fallbackGig) {
      const gig = fallbackGig;
      const rating = 4;
      const handleViewMoreGigs = () => {
        if (gig.artists && gig.artists.length > 0) {
          router.push(`/timeline?artist=${encodeURIComponent(gig.artists[0].name || gig.artists[0])}`);
        }
      };
      return (
        <ScrollView style={styles.container}>
          <View style={styles.headerImg} />
          <View style={styles.content}>
            <Text style={styles.artistName}>{gig.title}</Text>
            <Text style={styles.venue}>{gig.venue?.city || gig.venue || ''}</Text>
            <TouchableOpacity style={styles.dateChip}>
              <Text style={styles.dateChipText}>{gig.date ? new Date(gig.date).toLocaleDateString() : ''}</Text>
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
            <Text style={styles.bio}>{gig.bio || ''}</Text>
            {/* Show either Artists or Festival Lineup */}
            {gig.gig_type === 'festival' && gig.lineup ? (
              <View>
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
                      {gig.lineup.map((artist: any, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                          <Ionicons
                            name={gig.attendedArtists && gig.attendedArtists.some((a: any) => a.name === artist.name) ? 'checkbox' : 'square-outline'}
                            size={22}
                            color={gig.attendedArtists && gig.attendedArtists.some((a: any) => a.name === artist.name) ? '#4CAF50' : '#888'}
                            style={{ marginRight: 10 }}
                          />
                          <Text style={{ fontSize: 16 }}>{artist.name || artist}</Text>
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
              </View>
            ) : (
              <View>
                <Text style={styles.sectionTitle}>Artists</Text>
                <View style={{ marginBottom: 12 }}>
                  {gig.artists && gig.artists.map((artist: any, idx: number) => (
                    <Text key={idx} style={{ color: '#0B1533', fontWeight: 'bold', fontSize: 15, marginBottom: 2 }}>{artist.name || artist}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Multi-day festival section */}
            {gig.gig_type === 'multi-day' && gig.days && (
              <View>
                <Text style={styles.sectionTitle}>Festival Schedule</Text>
                {gig.days.map((day: any, idx: number) => (
                  <View key={idx} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                    <Text style={{ fontWeight: 'bold', color: '#0B1533', marginBottom: 4 }}>{day.date}</Text>
                    <Text style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>
                      {day.attended ? 'Attended' : 'Not attended'}
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: '#0B1533', marginBottom: 2 }}>Artists:</Text>
                    {day.artists.map((artist: any, i: number) => (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                        <Ionicons
                          name={day.seenArtists && day.seenArtists.some((a: any) => a.name === artist.name) ? 'checkbox' : 'square-outline'}
                          size={18}
                          color={day.seenArtists && day.seenArtists.some((a: any) => a.name === artist.name) ? '#4CAF50' : '#888'}
                          style={{ marginRight: 6 }}
                        />
                        <Text style={{ color: '#0B1533', fontSize: 14 }}>{artist.name || artist}</Text>
                      </View>
                    ))}
                    <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>
                      You saw {day.seenArtists ? day.seenArtists.length : 0}/{day.artists.length} artists
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity style={styles.allGigsBtn} onPress={handleViewMoreGigs}>
              <Text style={styles.allGigsBtnText}>View more gigs</Text>
            </TouchableOpacity>
            {/* Notes section */}
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>
                {'No notes added yet.'}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }
    // If no fallback gig, show not found message
    return (
      <View style={styles.container}>
        <Text style={{ color: '#E94F4F', fontSize: 18, margin: 40, textAlign: 'center' }}>
          Event not found. Please check your link or timeline.
        </Text>
      </View>
    );
  }

  const gig = userGig.gig;
  const rating = userGig.rating || 4;
  const handleViewMoreGigs = () => {
    if (gig.artists && gig.artists.length > 0) {
      router.push(`/timeline?artist=${encodeURIComponent(gig.artists[0].name || gig.artists[0])}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg} />
      <View style={styles.content}>
        <Text style={styles.artistName}>{gig.title}</Text>
        <Text style={styles.venue}>{gig.venue?.city || gig.venue || ''}</Text>
        <TouchableOpacity style={styles.dateChip}>
          <Text style={styles.dateChipText}>{gig.date ? new Date(gig.date).toLocaleDateString() : ''}</Text>
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
        <Text style={styles.bio}>{gig.bio || ''}</Text>
        {/* Show either Artists or Festival Lineup */}
        {gig.gig_type === 'festival' && gig.lineup ? (
          <View>
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
                  {gig.lineup.map((artist: any, idx: number) => (
                    <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Ionicons
                        name={gig.attendedArtists && gig.attendedArtists.some((a: any) => a.name === artist.name) ? 'checkbox' : 'square-outline'}
                        size={22}
                        color={gig.attendedArtists && gig.attendedArtists.some((a: any) => a.name === artist.name) ? '#4CAF50' : '#888'}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={{ fontSize: 16 }}>{artist.name || artist}</Text>
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
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Artists</Text>
            <View style={{ marginBottom: 12 }}>
              {gig.artists && gig.artists.map((artist: any, idx: number) => (
                <Text key={idx} style={{ color: '#0B1533', fontWeight: 'bold', fontSize: 15, marginBottom: 2 }}>{artist.name || artist}</Text>
              ))}
            </View>
          </View>
        )}
        {/* Multi-day festival section */}
        {gig.gig_type === 'multi-day' && gig.days && (
          <View>
            <Text style={styles.sectionTitle}>Festival Schedule</Text>
            {gig.days.map((day: any, idx: number) => (
              <View key={idx} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', color: '#0B1533', marginBottom: 4 }}>{day.date}</Text>
                <Text style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>
                  {day.attended ? 'Attended' : 'Not attended'}
                </Text>
                <Text style={{ fontWeight: 'bold', color: '#0B1533', marginBottom: 2 }}>Artists:</Text>
                {day.artists.map((artist: any, i: number) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                    <Ionicons
                      name={day.seenArtists && day.seenArtists.some((a: any) => a.name === artist.name) ? 'checkbox' : 'square-outline'}
                      size={18}
                      color={day.seenArtists && day.seenArtists.some((a: any) => a.name === artist.name) ? '#4CAF50' : '#888'}
                      style={{ marginRight: 6 }}
                    />
                    <Text style={{ color: '#0B1533', fontSize: 14 }}>{artist.name || artist}</Text>
                  </View>
                ))}
                <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>
                  You saw {day.seenArtists ? day.seenArtists.length : 0}/{day.artists.length} artists
                </Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.allGigsBtn} onPress={handleViewMoreGigs}>
          <Text style={styles.allGigsBtnText}>View more gigs</Text>
        </TouchableOpacity>
        {/* Notes section */}
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>
            {userGig.review || 'No notes added yet.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GigDetail;
