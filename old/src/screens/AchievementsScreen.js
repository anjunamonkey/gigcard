import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const achievements = [
  { name: 'First gig logged', earned: true },
  { name: 'Gigs in multiple countries', earned: false, progress: 1, goal: 2 },
  { name: 'Multiple gigs for the same artist', earned: true },
  { name: 'Festival attendance', earned: false, progress: 0, goal: 1 },
  { name: '10 gigs logged', earned: true },
];

export default function AchievementsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      {achievements.map((a, idx) => (
        <View key={idx} style={[styles.achievementCard, a.earned ? styles.earned : styles.locked]}>
          <Text style={styles.achievementName}>{a.name}</Text>
          {a.earned ? (
            <Text style={styles.earnedText}>Earned</Text>
          ) : (
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${(a.progress / a.goal) * 100}%` }]} />
              <Text style={styles.progressText}>{a.progress || 0}/{a.goal}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  achievementCard: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, marginBottom: 12 },
  earned: { borderLeftWidth: 6, borderLeftColor: '#4CAF50' },
  locked: { borderLeftWidth: 6, borderLeftColor: '#E94F4F' },
  achievementName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  earnedText: { color: '#4CAF50', fontWeight: 'bold' },
  progressBarContainer: { height: 16, backgroundColor: '#e0e0e0', borderRadius: 8, marginTop: 8, justifyContent: 'center' },
  progressBar: { height: 16, backgroundColor: '#E94F4F', borderRadius: 8, position: 'absolute', left: 0, top: 0 },
  progressText: { color: '#333', fontSize: 12, textAlign: 'center', zIndex: 1 },
});
