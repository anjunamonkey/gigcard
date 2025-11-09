import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../constants/Auth';

export default function AddEventScreen() {
  const router = useRouter();
  const [artistName, setArtistName] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [artistSuggestions, setArtistSuggestions] = useState<any[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingArtists, setSearchingArtists] = useState(false);
  const [gigResults, setGigResults] = useState<any[]>([]);
  const [selectedGigs, setSelectedGigs] = useState<Set<number>>(new Set());
  const [loadingGigs, setLoadingGigs] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Full form fields
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Dance', 'Pop', 'Rock', 'Ambient', 'Metal', 'Electronic', 'Jazz', 'Classical'];

  // Get user's location on mount
  useEffect(() => {
    // TODO: Get actual user location from device or profile
    setLocation('London, UK');
  }, []);

  // Fetch artist suggestions when user types (min 3 chars)
  useEffect(() => {
    if (artistName.trim().length < 3) {
      setArtistSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchingArtists(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/artists/search?q=${encodeURIComponent(artistName)}`, {
          headers: {
            'Authorization': BASIC_AUTH_HEADER,
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setArtistSuggestions(Array.isArray(data) ? data : []);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Artist search error:', error);
      } finally {
        setSearchingArtists(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [artistName]);

  // Fetch gigs when artist is selected
  useEffect(() => {
    if (!selectedArtist) {
      setGigResults([]);
      return;
    }

    async function fetchGigs() {
      setLoadingGigs(true);
      try {
        const params = new URLSearchParams();
        params.append('artist_id', selectedArtist.id.toString());
        if (location.trim()) params.append('location', location.trim());
        if (year.trim()) params.append('year', year.trim());

        const url = `${API_BASE_URL}/api/gigs/search?${params.toString()}`;
        console.log('Fetching gigs:', url);

        const res = await fetch(url, {
          headers: {
            'Authorization': BASIC_AUTH_HEADER,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Gig search response status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Gig search results:', data);
          setGigResults(Array.isArray(data) ? data : []);
        } else {
          const errorText = await res.text();
          console.error('Gig search error:', res.status, errorText);
          setGigResults([]);
        }
      } catch (error) {
        console.error('Gig search error:', error);
        setGigResults([]);
      } finally {
        setLoadingGigs(false);
      }
    }

    fetchGigs();
  }, [selectedArtist, location, year]);

  function handleSelectArtist(artist: any) {
    setSelectedArtist(artist);
    setArtistName(artist.name);
    setShowSuggestions(false);
    setSelectedGigs(new Set());
  }

  function toggleGigSelection(gigId: number, alreadyAttended: boolean) {
    if (alreadyAttended) return; // Don't allow selection of already attended gigs
    
    setSelectedGigs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(gigId)) {
        newSet.delete(gigId);
      } else {
        newSet.add(gigId);
      }
      return newSet;
    });
  }

  async function handleConfirmGigs() {
    if (selectedGigs.size === 0) return;

    try {
      const gigIds = Array.from(selectedGigs);
      console.log('Confirming gigs:', gigIds);
      
      const url = `${API_BASE_URL}/api/gigs/bulk_add/`;
      console.log('POST to:', url);
      console.log('Request body:', JSON.stringify({ gig_ids: gigIds }));
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': BASIC_AUTH_HEADER,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gig_ids: gigIds }),
      });

      console.log('Bulk add response status:', res.status);
      const responseText = await res.text();
      console.log('Bulk add response text:', responseText);

      if (res.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log('Bulk add response:', data);
          
          if (data.errors && data.errors.length > 0) {
            console.warn('Some gigs had errors:', data.errors);
          }
          
          if (data.created > 0) {
            // Navigate to the home tab with a refresh parameter
            router.replace('/(tabs)/?refresh=true');
          } else {
            alert('No gigs were added. They may already be in your collection.');
          }
        } catch (parseError) {
          console.error('Failed to parse response:', parseError);
          alert('Unexpected response from server.');
        }
      } else {
        console.error('Failed to add gigs:', res.status, responseText);
        alert(`Failed to add gigs (${res.status}). Please try again.`);
      }
    } catch (error) {
      console.error('Error adding gigs:', error);
      alert('An error occurred. Please check your connection and try again.');
    }
  }

  function handleManualAdd() {
    setShowManualForm(true);
  }

  const canSearch = selectedArtist !== null && location.trim() !== '';

  if (showManualForm) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowManualForm(false)} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Gig Manually</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Gig</Text>
        <View style={{ width: 60 }} />
      </View>
      
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.subtitle}>Search for the gig you attended</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Artist/Band Name *</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Type at least 3 characters..."
              value={artistName}
              onChangeText={(text) => {
                setArtistName(text);
                setSelectedArtist(null);
              }}
              autoCapitalize="words"
            />
            {searchingArtists && (
              <ActivityIndicator 
                size="small" 
                color="#E94F4F" 
                style={styles.searchIndicator}
              />
            )}
          </View>
          
          {showSuggestions && artistSuggestions.length > 0 && (
            <View style={styles.suggestionsBox}>
              {artistSuggestions.map((artist) => (
                <TouchableOpacity
                  key={artist.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectArtist(artist)}
                >
                  <Text style={styles.suggestionText}>{artist.name}</Text>
                  {artist.genre && (
                    <Text style={styles.suggestionGenre}>{artist.genre.name || artist.genre}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city or venue"
            value={location}
            onChangeText={setLocation}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Year (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2024"
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        {selectedArtist && (
          <>
            {loadingGigs ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E94F4F" />
                <Text style={styles.loadingText}>Searching for gigs...</Text>
              </View>
            ) : gigResults.length > 0 ? (
              <>
                <View style={styles.resultsHeader}>
                  <Text style={styles.resultsTitle}>
                    Found {gigResults.length} gig{gigResults.length !== 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.resultsSubtitle}>Select the gigs you attended</Text>
                </View>

                {gigResults.map((gig) => (
                  <TouchableOpacity
                    key={gig.id}
                    style={[
                      styles.gigCard,
                      selectedGigs.has(gig.id) && styles.gigCardSelected,
                      gig.already_attended && styles.gigCardAttended,
                    ]}
                    onPress={() => toggleGigSelection(gig.id, gig.already_attended)}
                    disabled={gig.already_attended}
                    activeOpacity={gig.already_attended ? 1 : 0.7}
                  >
                    <View style={styles.gigCardLeft}>
                      <View style={[
                        styles.checkbox,
                        selectedGigs.has(gig.id) && styles.checkboxSelected,
                        gig.already_attended && styles.checkboxDisabled,
                      ]}>
                        {gig.already_attended ? (
                          <Ionicons name="checkmark-circle" size={24} color="#999" />
                        ) : selectedGigs.has(gig.id) ? (
                          <Ionicons name="checkmark" size={18} color="#fff" />
                        ) : null}
                      </View>
                      <View style={styles.gigInfo}>
                        <View style={styles.gigTitleRow}>
                          <Text style={[
                            styles.gigTitle,
                            gig.already_attended && styles.gigTitleAttended
                          ]}>
                            {gig.title}
                          </Text>
                          {gig.already_attended && (
                            <View style={styles.attendedBadge}>
                              <Text style={styles.attendedBadgeText}>Attended</Text>
                            </View>
                          )}
                        </View>
                        {gig.artists && gig.artists.length > 0 && (
                          <Text style={[
                            styles.gigArtists,
                            gig.already_attended && styles.textMuted
                          ]}>
                            {gig.artists.map((a: any) => a.name).join(', ')}
                          </Text>
                        )}
                        <Text style={[
                          styles.gigDetails,
                          gig.already_attended && styles.textMuted
                        ]}>
                          {gig.venue?.name || 'Unknown Venue'}
                          {gig.venue?.city && ` • ${gig.venue.city}`}
                          {gig.venue?.country && `, ${gig.venue.country}`}
                        </Text>
                        <Text style={[
                          styles.gigDate,
                          gig.already_attended && styles.textMuted
                        ]}>
                          {new Date(gig.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}

                {selectedGigs.size > 0 && (
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmGigs}
                  >
                    <Text style={styles.confirmButtonText}>
                      Confirm {selectedGigs.size} Gig{selectedGigs.size !== 1 ? 's' : ''}
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.manualAddButton}
                  onPress={handleManualAdd}
                >
                  <Text style={styles.manualAddText}>Not finding it? Add manually</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={48} color="#ccc" />
                <Text style={styles.noResultsText}>No gigs found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try adjusting your location or year, or add manually
                </Text>
                <TouchableOpacity
                  style={styles.manualAddButtonPrimary}
                  onPress={handleManualAdd}
                >
                  <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.manualAddButtonPrimaryText}>Add Manually</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
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
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: { marginBottom: 24, position: 'relative' },
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
  searchIndicator: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  suggestionsBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#0B1533',
    fontWeight: '600',
  },
  suggestionGenre: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B1533',
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  gigCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  gigCardSelected: {
    borderColor: '#E94F4F',
    borderWidth: 2,
    backgroundColor: '#FFF5F5',
  },
  gigCardAttended: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
    borderColor: '#ccc',
  },
  gigCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#E94F4F',
    borderColor: '#E94F4F',
  },
  checkboxDisabled: {
    borderWidth: 0,
  },
  gigInfo: {
    flex: 1,
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B1533',
    marginBottom: 4,
  },
  gigTitleAttended: {
    color: '#999',
  },
  gigTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  attendedBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  attendedBadgeText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  gigArtists: {
    fontSize: 13,
    color: '#E94F4F',
    fontWeight: '600',
    marginBottom: 4,
  },
  gigDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  gigDate: {
    fontSize: 13,
    color: '#888',
  },
  confirmButton: {
    backgroundColor: '#E94F4F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  manualAddButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  manualAddText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    alignItems: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B1533',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  manualAddButtonPrimary: {
    flexDirection: 'row',
    backgroundColor: '#E94F4F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  manualAddButtonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
