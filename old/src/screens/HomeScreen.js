import { Image, StyleSheet, Text, View } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo-main.png')}
          style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: 8 }}
        />
      </View>
      <View style={styles.statsRow}>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('Timeline')}>
          <Text style={styles.statNumber}>169</Text>
          <Text style={styles.statLabel}>Concerts Attended</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('Bands')}>
          <Text style={styles.statNumber}>169</Text>
          <Text style={styles.statLabel}>Bands Seen</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Timeline')}>
        <Text style={styles.menuText}>Timeline</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Bands')}>
        <Text style={styles.menuText}>Bands</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.menuText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Memories')}>
        <Text style={styles.menuText}>Memories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Achievements')}>
        <Text style={styles.menuText}>Achievements</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginTop: 32, marginBottom: 24 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#E94F4F' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  statCard: { backgroundColor: '#0B1533', borderRadius: 16, padding: 24, alignItems: 'center', width: 150 },
  statNumber: { color: '#E94F4F', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: '#fff', fontSize: 14, marginTop: 8 },
  menuItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuText: { fontSize: 18, color: '#0B1533' },
});
