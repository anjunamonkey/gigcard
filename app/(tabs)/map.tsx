import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const allCountries = [
  { name: 'United Kingdom', cities: ['London', 'Manchester', 'Liverpool'] },
  { name: 'France', cities: ['Paris', 'Lyon'] },
];
const allCities = [
  { name: 'London', country: 'United Kingdom', venues: ['O2 Arena', 'Brixton Academy', 'Roundhouse'] },
  { name: 'Manchester', country: 'United Kingdom', venues: ['Manchester Arena', 'Albert Hall'] },
  { name: 'Liverpool', country: 'United Kingdom', venues: ['Echo Arena'] },
  { name: 'Paris', country: 'France', venues: ['AccorHotels Arena'] },
  { name: 'Lyon', country: 'France', venues: ['Le Transbordeur'] },
];
const allVenues = [
  { name: 'O2 Arena', attended: 3 },
  { name: 'Brixton Academy', attended: 2 },
  { name: 'Roundhouse', attended: 1 },
  { name: 'Manchester Arena', attended: 2 },
  { name: 'Albert Hall', attended: 1 },
  { name: 'Echo Arena', attended: 1 },
  { name: 'AccorHotels Arena', attended: 1 },
  { name: 'Le Transbordeur', attended: 1 },
];

export default function MapScreen() {
  // view: 'country' | 'city' | 'venue'
  const [view, setView] = useState('country');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Logic for showing pills
  const showCountryPill = allCountries.length > 1;
  const showCityPill = (showCountryPill || allCities.length > 1);
  const showVenuePill = true;

  // Filtered lists
  const filteredCountries = allCountries;
  const filteredCities = selectedCountry
    ? allCities.filter(c => c.country === selectedCountry)
    : allCities;
  const filteredVenues = selectedCity
    ? allCities.find(c => c.name === selectedCity)?.venues.map(v => allVenues.find(av => av.name === v)).filter(Boolean) || []
    : allVenues;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Locations & Venues</Text>
      <View style={styles.pillsContainer}>
        <View style={styles.viewToggle}>
          {showCountryPill && (
            <TouchableOpacity 
              style={[styles.toggleButton, view === 'country' && styles.toggleButtonActive]}
              onPress={() => { setView('country'); setSelectedCountry(null); setSelectedCity(null); }}
            >
              <Text style={[styles.toggleText, view === 'country' && styles.toggleTextActive]}>Country</Text>
            </TouchableOpacity>
          )}
          {showCityPill && (
            <TouchableOpacity 
              style={[styles.toggleButton, view === 'city' && styles.toggleButtonActive]}
              onPress={() => { setView('city'); setSelectedCity(null); }}
            >
              <Text style={[styles.toggleText, view === 'city' && styles.toggleTextActive]}>City</Text>
            </TouchableOpacity>
          )}
          {showVenuePill && (
            <TouchableOpacity 
              style={[styles.toggleButton, view === 'venue' && styles.toggleButtonActive]}
              onPress={() => setView('venue')}
            >
              <Text style={[styles.toggleText, view === 'venue' && styles.toggleTextActive]}>Venues</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Pills content */}
      {view === 'country' && (
        filteredCountries.map((country, idx) => (
          <TouchableOpacity key={idx} style={styles.mapCard} onPress={() => { setSelectedCountry(country.name); setView('city'); }}>
            <Text style={styles.mapTitle}>{country.name}</Text>
            <Text style={styles.mapMeta}>{country.cities.length} Cities</Text>
          </TouchableOpacity>
        ))
      )}
      {view === 'city' && (
        filteredCities.map((city, idx) => (
          <TouchableOpacity key={idx} style={styles.mapCard} onPress={() => { setSelectedCity(city.name); setView('venue'); }}>
            <Text style={styles.mapTitle}>{city.name}</Text>
            <Text style={styles.mapMeta}>{city.venues.length} Venues</Text>
          </TouchableOpacity>
        ))
      )}
      {view === 'venue' && (
        filteredVenues.map((venue, idx) => (
          venue ? (
            <TouchableOpacity
              key={idx}
              style={styles.mapCard}
              onPress={() => {
                // Navigate to timeline tab, passing venue filter
                // If using expo-router, you might use router.push with params
                // Example: router.push({ pathname: '/timeline', params: { venue: venue.name } })
                // For now, use a simple route with query param
                window.location.href = `/timeline?venue=${encodeURIComponent(venue.name)}`;
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.mapTitle}>{venue.name}</Text>
                <Text style={{ color: '#E94F4F', fontWeight: 'bold', fontSize: 16 }}>{venue.attended}x</Text>
              </View>
            </TouchableOpacity>
          ) : null
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 0 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0B1533', marginTop: 18, marginLeft: 18, marginBottom: 20 },
  pillsContainer: { marginHorizontal: 18 }, // new wrapper for pills
  viewToggle: { 
    flexDirection: 'row', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 25, 
    padding: 4, 
    marginBottom: 20,
  },
  toggleButton: { 
    flex: 1, 
    paddingVertical: 10, 
    alignItems: 'center', 
    borderRadius: 20,
    // removed marginHorizontal
  },
  toggleButtonActive: { backgroundColor: '#E94F4F' },
  toggleText: { color: '#666', fontWeight: 'bold' },
  toggleTextActive: { color: '#fff' },
  mapCard: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 16,
    marginHorizontal: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#E94F4F'
  },
  mapTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B1533', marginBottom: 8 },
  mapMeta: { fontSize: 14, color: '#666' },
});
