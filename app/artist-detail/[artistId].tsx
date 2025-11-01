import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../../constants/Auth';

// Use a valid fallback image path. Place a default image at /Users/oliverdaniel/gigcard/app/app/assets/images/default-artist.png
const defaultArtistImage = require('../../assets/images/default-artist.png');

export default function ArtistDetailScreen() {
  const { artistId } = useLocalSearchParams();
  const router = useRouter();
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) return;
    fetch(`${API_BASE_URL}/api/artists_seen/artist_pk${artistId}/`, {
      headers: {
        'Authorization': BASIC_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setArtist(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [artistId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#EA4949" />
      </View>
    );
  }

  if (!artist) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: '#E94F4F', fontWeight: 'bold', fontSize: 18 }}>Artist not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg}>
        <Image
          source={artist.artist_image ? { uri: artist.artist_image } : defaultArtistImage}
          style={{ width: '100%', height: 220, resizeMode: 'cover', borderRadius: 0 }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.artistName}>{artist.artist_name}</Text>
        <Text style={styles.seen}>Seen {artist.times_seen} times</Text>
        <Text style={styles.bio}>{artist.artist_description || ''}</Text>
        <Text style={styles.sectionTitle}>Gigs</Text>
        <View style={styles.gigRow}>
          {[...artist.usergigs]
            .sort((a, b) => new Date(b.gig_date).getTime() - new Date(a.gig_date).getTime())
            .map((gig: any, i: number) => (
              <TouchableOpacity
                key={gig.id}
                style={styles.gigChip}
                onPress={() => router.push(`/gig-detail/${gig.id}`)}
              >
                <Text style={styles.gigChipText}>
                  {gig.gig_date ? new Date(gig.gig_date).toLocaleDateString() : ''} - {gig.gig_title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <Text style={styles.sectionTitle}>Memories</Text>
        <View style={styles.memoriesRow}>
          {artist.memories && artist.memories.length > 0 ? (
            artist.memories.map((memory: any, i: number) => (
              <View
                key={i}
                style={[
                  styles.memoryDot,
                  { backgroundColor: memory.color || memory || '#eee' }
                ]}
              />
            ))
          ) : (
            <Text style={{ color: '#888', fontSize: 14 }}>No memories yet.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImg: { height: 220, backgroundColor: '#222', width: '100%', overflow: 'hidden' },
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
