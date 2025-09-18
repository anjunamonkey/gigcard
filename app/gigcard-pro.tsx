import React, { useRef } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const placeholderImage = require('../assets/images/react-logo.png');
const carouselFeatures = [
  {
    title: 'Regions in 25+ countries',
    image: placeholderImage,
    description: 'Unlock regions and stats for gigs in over 25 countries.'
  },
  {
    title: 'Advanced Stats',
    image: placeholderImage,
    description: 'See detailed gig and artist statistics.'
  },
  {
    title: 'Unlimited Memories',
    image: placeholderImage,
    description: 'Save unlimited gig memories and photos.'
  },
  {
    title: 'Custom Themes',
    image: placeholderImage,
    description: 'Personalize your app with custom themes.'
  },
  {
    title: 'Early Access Features',
    image: placeholderImage,
    description: 'Get new features before anyone else.'
  },
];


export default function GigCardProPage() {
  const scrollRef = useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Premium</Text>
        <Text style={styles.heroSubtitle}>One purchase unlocks all features</Text>
      </View>
      <View style={styles.carouselWrap}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {carouselFeatures.map((item, idx) => (
            <View key={idx} style={[styles.carouselSlide, { width }]}> 
              <View style={styles.carouselImageWrap}>
                <Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
              </View>
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselDesc}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.carouselDotsWrap}>
          {carouselFeatures.map((_, idx) => (
            <View key={idx} style={styles.carouselDot} />
          ))}
        </View>
      </View>
      <Text style={styles.priceText}>One-time purchase: <Text style={{ fontWeight: 'bold' }}>£1.99</Text></Text>
      <TouchableOpacity style={styles.joinBtn} onPress={() => {/* TODO: handle join action */}}>
        <Text style={styles.joinBtnText}>Unlock Premium</Text>
      </TouchableOpacity>
      <Text style={styles.restoreText}>Restore Purchase</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', alignItems: 'center', paddingTop: 0 },
  hero: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 18,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 0,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'left',
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#888',
    marginBottom: 0,
    textAlign: 'left',
  },
  carouselWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 0,
    shadowColor: '#0B1533',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  carouselSlide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  carouselImageWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  carouselImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 18,
    backgroundColor: '#F7F8FA',
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  carouselDesc: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 0,
    paddingHorizontal: 12,
  },
  carouselDotsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 0,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  priceText: {
    fontSize: 16,
    color: '#888',
    marginTop: 24,
    marginBottom: 0,
    textAlign: 'center',
  },
  joinBtn: { backgroundColor: '#222', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center', marginBottom: 12, marginTop: 18, shadowColor: '#EA4949', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  joinBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  restoreText: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 12 },
});
