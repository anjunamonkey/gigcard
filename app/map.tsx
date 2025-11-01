import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../constants/Auth';

export default function MapScreen() {
  const [view, setView] = useState('country');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/venues_visited/`, {
      headers: {
        'Authorization': BASIC_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setVenues(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Reset state when tab is focused
  useFocusEffect(
    React.useCallback(() => {
      setView('country');
      setSelectedCountry(null);
      setSelectedCity(null);
    }, [])
  );

  // Extract countries and cities from venues data
  const allCountries = Array.from(new Set(venues.map(v => v.country))).map(country => ({
    name: country,
    cities: Array.from(new Set(venues.filter(v => v.country === country).map(v => v.city))),
  }));

  const allCities = Array.from(new Set(venues.map(v => v.city))).map(city => ({
    name: city,
    country: venues.find(v => v.city === city)?.country || '',
    venues: venues.filter(v => v.city === city).map(v => v.name),
  }));

  const allVenues = venues.map(v => ({
    name: v.name,
    attended: v.times_visited,
    address: v.address,
    city: v.city,
    country: v.country,
    capacity: v.capacity,
    venue_type: v.venue_type,
    physical_type: v.physical_type,
  }));

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
    ? allVenues.filter(v => v.city === selectedCity)
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
      {loading ? (
        <Text style={{ textAlign: 'center', color: '#888', fontSize: 16, marginTop: 32 }}>Loading venues...</Text>
      ) : (
        <>
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
              <TouchableOpacity
                key={idx}
                style={styles.mapCard}
                onPress={() => {
                  require('expo-router').useRouter().push(`/timeline?venue=${encodeURIComponent(venue.name)}`);
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.mapTitle}>{venue.name}</Text>
                    <Text style={styles.mapMeta}>{venue.city}, {venue.country}</Text>
                    <Text style={styles.mapMeta}>Capacity: {venue.capacity} · {venue.venue_type} · {venue.physical_type}</Text>
                  </View>
                  <Text style={{ color: '#E94F4F', fontWeight: 'bold', fontSize: 16 }}>{venue.attended}x</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </>
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
