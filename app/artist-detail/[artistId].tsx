import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../../constants/Auth';

// Removed the default static fallback image

export default function ArtistDetailScreen() {
  const { artistId } = useLocalSearchParams();
  const router = useRouter();
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch detail by numeric id (uses your ArtistsSeenDetailAPIView)
  async function fetchArtistDetailById(id: string | number) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/artists_seen/artist_pk${id}/`, {
        headers: {
          'Authorization': BASIC_AUTH_HEADER,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (e) {
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Helper to fetch the list of seen artists and try to resolve by name
  async function findArtistByName(name: string) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/artists_seen/`, {
        headers: {
          'Authorization': BASIC_AUTH_HEADER,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) return null;
      const list = await res.json();
      if (!Array.isArray(list)) return null;
      const lower = name.toLowerCase();
      const match = list.find((it: any) => {
        const n = (it.name ?? it.artist_name ?? '').toString().toLowerCase();
        return n === lower;
      }) || list.find((it: any) => {
        const n = (it.name ?? it.artist_name ?? '').toString().toLowerCase();
        return n.includes(lower);
      });
      if (!match) return null;
      return await fetchArtistDetailById(match.id);
    } catch (e) {
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!artistId) {
      setLoading(false);
      return;
    }

    let mounted = true;
    (async () => {
      setArtist(null);
      setLoading(true);
      const idStr = String(artistId);
      const decoded = decodeURIComponent(idStr);
      const isNumeric = /^\d+$/.test(decoded);

      let detail = null;
      if (isNumeric) {
        detail = await fetchArtistDetailById(decoded);
      } else {
        // try resolving by name/slug
        detail = await findArtistByName(decoded);
      }

      if (!mounted) return;
      setArtist(detail);
      setLoading(false);
    })();
    return () => { mounted = false; };
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
        <Text style={{ color: '#E94F4F', fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Artist not found</Text>
        <Text style={{ color: '#666', fontSize: 14, textAlign: 'center', marginHorizontal: 24, marginBottom: 16 }}>
          We couldn't resolve this artist. You can search the artists list instead.
        </Text>
        <TouchableOpacity
          onPress={() => router.push(`/artists?search=${encodeURIComponent(String(artistId || ''))}&showDetailed=true`)}
          style={{ backgroundColor: '#EA4949', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Search artists</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImg}>
        {artist.artist_image_absolute ? (
          <Image
            source={{ uri: `${API_BASE_URL}/media/artist_images/artist-default.png` }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        ) : null}
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
