import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <View style={styles.carouselMain}>
          <Text style={styles.carouselText}>Swipe to browse memories</Text>
        </View>
        {/* Placeholder for carousel dots */}
        <View style={styles.carouselDotRow}>
          {memories.map((_, idx) => (
            <View key={idx} style={[styles.carouselDot, idx === 0 && styles.carouselDotActive]} />
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
      <Text style={styles.sectionTitle}>All Memories</Text>
      {memories.map((memory, idx) => (
        <TouchableOpacity key={idx} style={styles.memoryListItem}>
          <View style={styles.memoryListImage} />
          <Text style={styles.memoryListCaption}>{memory.caption}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0B1533', marginBottom: 20 },
  carousel: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 24,
    alignItems: 'center'
  },
  carouselMain: {
    height: 200,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  carouselText: { color: '#666', fontStyle: 'italic' },
  carouselDotRow: { flexDirection: 'row', justifyContent: 'center' },
  carouselDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#ddd', 
    marginHorizontal: 4 
  },
  carouselDotActive: { backgroundColor: '#E94F4F' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B1533', marginBottom: 12 },
  memoriesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  memoryCard: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12, 
    padding: 12, 
    width: '48%',
    alignItems: 'center'
  },
  memoryImage: { 
    width: '100%', 
    height: 120, 
    backgroundColor: '#ddd', 
    borderRadius: 8, 
    marginBottom: 8 
  },
  memoryCaption: { fontSize: 12, color: '#666', textAlign: 'center' },
  memoryListItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center'
  },
  memoryListImage: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 12
  },
  memoryListCaption: { fontSize: 16, color: '#0B1533', flex: 1 },
});
