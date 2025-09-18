import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddEventScreen() {
  const router = useRouter();
  const [artistName, setArtistName] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Dance', 'Pop', 'Rock', 'Ambient', 'Metal', 'Electronic', 'Jazz', 'Classical'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Gig</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Artist/Band Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter artist name"
            value={artistName}
            onChangeText={setArtistName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Venue *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter venue name"
            value={venue}
            onChangeText={setVenue}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date *</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateText}>
              {date || 'Select date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Genre</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
            {genres.map((genre) => (
              <TouchableOpacity 
                key={genre} 
                style={[
                  styles.genreChip, 
                  selectedGenre === genre && styles.genreChipSelected
                ]}
                onPress={() => setSelectedGenre(genre)}
              >
                <Text style={[
                  styles.genreText,
                  selectedGenre === genre && styles.genreTextSelected
                ]}>
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any notes about the gig..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.addPhotoBtn}>
          <Text style={styles.addPhotoText}>+ Add Photos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backButton: { },
  backText: { fontSize: 16, color: '#E94F4F' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0B1533' },
  saveButton: { },
  saveText: { fontSize: 16, color: '#E94F4F', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  section: { marginBottom: 24 },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#0B1533', 
    marginBottom: 8 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },
  dateText: {
    fontSize: 16,
    color: '#666'
  },
  genreRow: {
    flexDirection: 'row'
  },
  genreChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8
  },
  genreChipSelected: {
    backgroundColor: '#E94F4F'
  },
  genreText: {
    color: '#666',
    fontSize: 14
  },
  genreTextSelected: {
    color: '#fff',
    fontWeight: 'bold'
  },
  addPhotoBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed'
  },
  addPhotoText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
