import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const memories = [
  { caption: 'Above & Beyond, 2021' },
  { caption: 'Tinlicker, 2022' },
  { caption: 'Armin Van Buuren, A State of Trance, 2023' },
];

export default function MemoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Memories</Text>
      <View style={styles.carousel}>
        {/* Placeholder for carousel dots */}
        <View style={styles.carouselDotRow}>
          {memories.map((_, idx) => (
            <View key={idx} style={styles.carouselDot} />
          ))}
        </View>
      </View>
      <Text style={styles.sectionTitle}>Recent</Text>
      <View style={styles.memoriesRow}>
        {memories.slice(0, 2).map((m, idx) => (
          <View key={idx} style={styles.memoryCard}>
            <View style={styles.memoryImage} />
            <Text style={styles.memoryCaption}>{m.caption}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>All</Text>
      {memories.map((m, idx) => (
        <View key={idx} style={styles.memoryCardAll}>
          <View style={styles.memoryImageAll} />
          <Text style={styles.memoryCaption}>{m.caption}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  carousel: { height: 180, backgroundColor: '#f0f0f0', borderRadius: 16, marginBottom: 16, justifyContent: 'center', alignItems: 'center' },
  carouselDotRow: { flexDirection: 'row', marginTop: 8 },
  carouselDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ccc', marginHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  memoriesRow: { flexDirection: 'row', marginBottom: 16 },
  memoryCard: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, marginRight: 8, alignItems: 'center' },
  memoryImage: { width: 80, height: 80, backgroundColor: '#e0e0e0', borderRadius: 8, marginBottom: 8 },
  memoryCaption: { fontSize: 14, color: '#333', textAlign: 'center' },
  memoryCardAll: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, marginBottom: 8, alignItems: 'center' },
  memoryImageAll: { width: 120, height: 80, backgroundColor: '#e0e0e0', borderRadius: 8, marginBottom: 8 },
  uploadBtn: { backgroundColor: '#0B1533', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 24 },
  uploadText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
