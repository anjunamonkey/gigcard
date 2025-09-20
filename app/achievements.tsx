import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const achievements = [
  { name: 'First gig logged', earned: true },
  { name: 'Gigs in multiple countries', earned: false, progress: 1, goal: 2 },
  { name: 'Multiple gigs for the same artist', earned: true },
  { name: 'Festival attendance', earned: false, progress: 0, goal: 1 },
  { name: '10 gigs logged', earned: true },
];

const achievementIcons: Record<string, string> = {
  'First gig logged': 'ribbon-outline',
  'Gigs in multiple countries': 'airplane-outline',
  'Multiple gigs for the same artist': 'star-outline',
  'Festival attendance': 'musical-notes-outline',
  '10 gigs logged': 'flame-outline',
};

export default function AchievementsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Achievements</Text>
      </View>
      <Text style={styles.pageTitle}>Achievements</Text>
      <ScrollView style={styles.content}>
        {achievements.map((a, idx) => (
          <View key={idx} style={[styles.achievementCard, a.earned ? styles.earned : styles.locked]}>
            <View style={styles.achievementIconWrap}>
              <Ionicons
                name={achievementIcons[a.name] || 'ribbon-outline'}
                size={28}
                color={a.earned ? '#4CAF50' : '#EA4949'}
                style={styles.achievementIcon}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.achievementName}>{a.name}</Text>
              {a.earned ? (
                <Text style={styles.earnedText}>Earned</Text>
              ) : (
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${((a.progress || 0) / (a.goal || 1)) * 100}%` }]} />
                  <Text style={styles.progressText}>{a.progress || 0}/{a.goal}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backButton: { marginRight: 16 },
  backText: { fontSize: 16, color: '#E94F4F' },
  title: { fontSize: 0 }, // hide old title in header
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#0B1533', marginLeft: 18, marginTop: 18, marginBottom: 8 }, // consistent margin
  content: { flex: 1, padding: 16 },
  achievementCard: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  earned: { borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  locked: { borderLeftWidth: 4, borderLeftColor: '#ddd' },
  achievementName: { fontSize: 16, fontWeight: 'bold', color: '#0B1533', flex: 1 },
  earnedText: { color: '#4CAF50', fontWeight: 'bold' },
  progressBarContainer: { alignItems: 'flex-end' },
  progressBar: { 
    height: 4, 
    backgroundColor: '#E94F4F', 
    borderRadius: 2, 
    minWidth: 50 
  },
  progressText: { fontSize: 12, color: '#666', marginTop: 4 },
  achievementIconWrap: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3F2FD',
    shadowColor: '#011030',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  achievementIcon: {
    // no extra styles needed
  },
});
