import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PageTitle from '../../components/PageTitle';

const memories = [
  { caption: 'Above & Beyond, 2021', image: require('../../assets/images/above-beyond.jpg'), gigId: 'above-&-beyond-november-2024' },
  { caption: 'Tinlicker, 2022', image: require('../../assets/images/tinlicker.jpg'), gigId: 'jan-blomqvist-november-2023' },
  { caption: 'Armin Van Buuren, A State of Trance, 2023', image: require('../../assets/images/jan-blomqvist.jpg'), gigId: 'elderbrook-october-2023' },
];

export default function MemoriesScreen() {
  const router = useRouter();

  const handleMemoryPress = (gigId: string) => {
    router.push(`/gig-detail/${gigId}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <PageTitle style={styles.title}>Memories</PageTitle>
      <View style={styles.carousel}>
        <TouchableOpacity style={styles.carouselMain} onPress={() => handleMemoryPress(memories[0].gigId)}>
          <Text style={styles.carouselText}>Swipe to browse memories</Text>
        </TouchableOpacity>
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
          <TouchableOpacity key={idx} style={styles.memoryCard} onPress={() => handleMemoryPress(m.gigId)}>
            <Image source={m.image} style={styles.memoryImage} />
            <Text style={styles.memoryCaption}>{m.caption}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>All Memories</Text>
      {memories.map((memory, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.memoryListItem}
          onPress={() => handleMemoryPress(memory.gigId)}
        >
          <Image source={memory.image} style={styles.memoryListImage} />
          <Text style={styles.memoryListCaption}>{memory.caption}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 0, paddingHorizontal: 18 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1533',
    marginBottom: 0,
    textAlign: 'left',
    letterSpacing: -0.5,
    marginTop: 18,
  },
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
