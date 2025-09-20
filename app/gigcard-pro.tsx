import React, { useRef } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const placeholderImage = require('../assets/images/react-logo.png');
const carouselFeatures = [
  {
    title: 'Unlimited Memories',
    image: placeholderImage,
    description: 'Save unlimited gig memories and photos.',
  },
  {
    title: 'Advanced Analytics',
    image: placeholderImage,
    description: 'See stats for festivals, venue types, gig lengths, and day/night gigs.',
  },
  {
    title: 'Pro Badges & Achievements',
    image: placeholderImage,
    description: 'Unlock exclusive badges and achievements for Pro users.',
  },
  {
    title: 'Log Gigs in Multiple Countries',
    image: placeholderImage,
    description: 'Track and log gigs across different countries.',
  },
  {
    title: 'Video Memories',
    image: placeholderImage,
    description: 'Attach and save videos to your gig memories.',
  },
  {
    title: 'Auto Discovery from Device Camera Roll',
    image: placeholderImage,
    description: 'Automatically discover and suggest gig photos from your camera roll.',
  },
];


export default function GigCardProPage() {
  const scrollRef = useRef(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GigCard Pro</Text>
      <View style={styles.hero}>
        {/* <Text style={styles.heroTitle}>Premium</Text> */}
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
      <View style={styles.centerContent}>
        <Text style={styles.priceText}>
          One-time purchase: <Text style={{ fontWeight: 'bold' }}>£1.99/month</Text>
        </Text>
        <TouchableOpacity style={styles.joinBtn} onPress={() => {/* TODO: handle join action */}}>
          <Text style={styles.joinBtnText}>Unlock Premium</Text>
        </TouchableOpacity>
        <Text style={styles.restoreText}>Restore Purchase</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', alignItems: 'flex-start', paddingTop: 0 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0B1533', marginTop: 18, marginLeft: 18, marginBottom: 0 },
  hero: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 18,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 0,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
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
  centerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  priceText: {
    fontSize: 16,
    color: '#888',
    marginTop: 24,
    marginBottom: 0,
    textAlign: 'center',
    width: '100%',
  },
  joinBtn: {
    backgroundColor: '#222',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 18,
    shadowColor: '#EA4949',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: '80%',
    alignSelf: 'center',
  },
  joinBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  restoreText: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 12, width: '100%' },
});
