import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  // Dummy badges
  const badges = [
  { icon: 'ribbon-outline', label: 'Superfan' },
  { icon: 'star-outline', label: 'VIP' },
  { icon: 'flame-outline', label: 'Hot Streak' },
  { icon: 'trophy-outline', label: 'Legend' },
  ];

  // Dummy recent activity
  const recentActivity = [
    { type: 'concert', text: 'Saw The Strokes at Brixton Academy' },
    { type: 'memory', text: 'Added photo from Glastonbury' },
    { type: 'review', text: 'Rated Arctic Monkeys - 02/05/2024' },
  ];

  // Dummy featured event
  const featuredEvent = {
    title: 'Upcoming: Foo Fighters',
    date: 'July 21, 2024',
    location: 'Wembley Stadium',
    icon: 'musical-notes',
  };

  // Dummy progress
  const progress = 0.65;
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  // Example metrics (replace with real data as needed)
  const stats = [
    {
      label: 'Concerts Attended',
      value: 169,
  icon: 'musical-notes-outline',
      onPress: () => router.push('./timeline'),
    },
    {
      label: 'Bands Seen',
      value: 169,
  icon: 'people-outline',
      onPress: () => router.push('./bands'),
    },
    {
      label: 'Genres Seen',
      value: 12,
  icon: 'albums-outline',
      onPress: () => {},
    },
    {
      label: 'Most Times Seen',
      value: 17,
  icon: 'star-outline',
      onPress: () => router.push('./bands'),
    },
    {
      label: 'Memories Logged',
      value: 42,
  icon: 'images-outline',
      onPress: () => router.push('./memories'),
    },
    {
      label: 'Venues',
      value: 34,
  icon: 'business-outline',
      onPress: () => router.push('./map'),
    },
  ];

  // Profile photo logic (copied from profile.tsx)
  const [profilePhoto, setProfilePhoto] = useState(null); // Placeholder for image URI
  const name = 'Oliver Daniel'; // Replace with actual user name if available

  return (
    <View style={styles.container}>
      {/* Accent shapes */}
      <View style={styles.bgAccentCircle1} />
      <View style={styles.bgAccentCircle2} />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header bar with background */}
        <View style={styles.headerBar}>
          <View style={styles.header}>
            {/* <Image
              source={require('../assets/images/logo-alt.png')}
              style={styles.logoImg}
              resizeMode="contain"
            /> */}
          </View>
        </View>
        {/* Profile bar */}
        <View style={styles.profileBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={styles.profileAvatar}>
              {/* Profile picture logic */}
              <View style={styles.profilePicCircle}>
                {profilePhoto ? (
                  // TODO: Render Image component with profilePhoto URI
                  <Image source={{ uri: profilePhoto }} style={styles.profilePicImage} />
                ) : (
                  <Text style={styles.profilePicInitial}>
                    {name.charAt(0).toUpperCase()}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/profile')} activeOpacity={0.7}>
              <Text style={styles.profileName}>Oliver Daniel</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* QR icon */}
              <TouchableOpacity style={styles.profileQR} onPress={() => router.push('/gigcard-qr')}>
                <Ionicons name="qr-code-outline" size={28} color="#011030" />
              </TouchableOpacity>
              {/* Settings icon */}
              <TouchableOpacity style={styles.profileSettings} onPress={() => router.push('/profile')}>
                <Ionicons name="settings-outline" size={28} color="#011030" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.spacer} />
        {/* Featured event card */}
        <TouchableOpacity
          style={[styles.card, styles.featuredCard]}
          onPress={() => router.push(`/gig-detail/above-&-beyond-november-2024`)}
          activeOpacity={0.85}
        >
          <Ionicons name={featuredEvent.icon} size={32} color="#EA4949" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.featuredTitle}>Most recent: Foo Fighters</Text>
            <Text style={styles.featuredSubtitle}>{featuredEvent.date} · {featuredEvent.location}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.spacer} />
        {/* Motivational quote/fun fact */}
        <View style={[styles.card, styles.quoteCard]}>
          <Text style={styles.quoteText}>
            "Live music is the cure for the common day."
          </Text>
        </View>
        <View style={styles.spacer} />
        {/* Block color section */}
        <View style={[styles.card, styles.blockSection]}>
          <View style={styles.blockAccentBar} />
          <Text style={styles.blockSectionText}>
            Welcome back, Oliver! Ready to log your next gig or memory?
          </Text>
        </View>
        <View style={styles.spacer} />
        {/* Section heading for stats */}
        <View style={styles.sectionHeadingRow}>
          <View style={styles.sectionAccentBar} />
          <Text style={styles.sectionHeading}>Your Stats</Text>
        </View>
        <View style={styles.spacerSmall} />

        {/* Discover GigCard Pro tile */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#F7F8FA', borderColor: '#E94F4F', borderWidth: 2, marginHorizontal: 16, marginBottom: 0, padding: 18 }]}
          onPress={() => router.push('/gigcard-pro')}
          activeOpacity={0.85}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="star-outline" size={32} color="#E94F4F" style={{ marginRight: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0B1533', marginBottom: 2 }}>Discover GigCard Pro</Text>
              <Text style={{ fontSize: 15, color: '#EA4949', opacity: 0.8 }}>Unlock advanced features and support the app</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.spacerSmall} />
        {/* Tile-based grid layout for stats */}
        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <TouchableOpacity key={idx} style={[styles.card, styles.statTile]} onPress={stat.onPress} activeOpacity={0.85}>
              <View style={styles.statTileContent}>
                <Ionicons name={stat.icon as any} size={28} color="#0B1533" style={styles.statTileIcon} />
                <Text style={styles.statTileLabel}>{stat.label}</Text>
                <Text style={styles.statTileValue}>{stat.value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.spacer} />
        {/* Badges section */}
        <View style={styles.sectionHeadingRow}>
          <View style={styles.sectionAccentBar} />
          <Text style={styles.sectionHeading}>Your Badges</Text>
        </View>
        <View style={styles.spacerSmall} />
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/achievements')}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesRow}>
            {badges.map((badge, idx) => (
              <View key={idx} style={[styles.card, styles.badgeCard]}>
                <Ionicons name={badge.icon as any} size={28} color="#EA4949" />
                <Text style={styles.badgeLabel}>{badge.label}</Text>
              </View>
            ))}
          </ScrollView>
        </TouchableOpacity>
        <View style={styles.spacerSmall} />
        {/* Next Badge Progress bar */}
        <View style={[styles.card, styles.progressBarWrap]}>
          <Text style={styles.progressLabel}>Next Badge Progress</Text>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }) }]} />
          </View>
        </View>
        <View style={styles.spacer} />
        {/* Divider */}
        <View style={styles.divider} />
        <View style={styles.spacer} />
        {/* Section heading for achievements */}
        <View style={styles.sectionHeadingRow}>
          <View style={styles.sectionAccentBar} />
          <Text style={styles.sectionHeading}>Achievements</Text>
        </View>
        <View style={styles.spacerSmall} />
        {/* Achievements tile */}
        <TouchableOpacity 
          style={[styles.card, styles.achievementsTile]} 
          onPress={() => router.push('/search-gigcards')}
          activeOpacity={0.85}
        >
          <View style={styles.achievementsTileContent}>
            <View style={styles.achievementsTileIconWrap}>
              <View style={styles.achievementsTileIconCircle}>
                <Ionicons name="ribbon" size={28} color="#0B1533" />
              </View>
            </View>
            <View style={styles.achievementsTileTextWrap}>
              <Text style={styles.achievementsTileTitle}>Achievements</Text>
              <Text style={styles.achievementsTileDesc}>
                You can earn achievements by completing certain activities in the app.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.spacer} />
        {/* Divider */}
        <View style={styles.divider} />
        <View style={styles.spacer} />
        {/* Section heading for recent activity */}
        <View style={styles.sectionHeadingRow}>
          <View style={styles.sectionAccentBar} />
          <Text style={styles.sectionHeading}>Recent Activity</Text>
        </View>
        <View style={styles.spacerSmall} />
        <View style={styles.activityFeed}>
          {recentActivity.map((item, idx) => (
            <View key={idx} style={[styles.card, styles.activityCard]}>
              <Ionicons
                name={
                  item.type === 'concert' ? 'musical-notes' :
                  item.type === 'memory' ? 'images' :
                  item.type === 'band' ? 'people' :
                  item.type === 'review' ? 'star' :
                  'ellipse'
                }
                size={22}
                color="#EA4949"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.activityText}>{item.text}</Text>
            </View>
          ))}
        </View>
        {/* GigCards actions card - moved to bottom */}
        <View style={styles.spacer} />
        <View style={styles.spacer} />

        {/* Divider */}
        <View style={styles.divider} />
        <View style={styles.spacer} />


        <View style={styles.spacerSmall} />
        {/* Achievements tile */}
        <TouchableOpacity 
          style={[styles.card, styles.achievementsTile]} 
          onPress={() => router.push('/search-gigcards')}
          activeOpacity={0.85}
        >
          <View style={styles.achievementsTileContent}>
            <View style={styles.achievementsTileIconWrap}>
              <View style={styles.achievementsTileIconCircle}>
                {/* <Image
                  source={require('../../assets/images/logo-icon.png')}
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                /> */}
              </View>
            </View>
            <View style={styles.achievementsTileTextWrap}>
              <Text style={styles.achievementsTileTitle}>View Other GigCards</Text>
              <Text style={styles.achievementsTileDesc}>
                Connect with friends and explore their GigCards. Choose to save favourites and see what gigs they've attended.
              </Text>
            </View>
          </View>
          </TouchableOpacity>


        <View style={styles.spacerSmall} />

        <View style={styles.spacerSmall} />

        <View style={styles.spacer} />
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/add-event')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' }, // softened background
  scrollContainer: { flex: 1 },
  headerBar: {
    backgroundColor: '#011030',
    paddingTop: 16,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginBottom: 0,
  },
  header: {
    alignItems: 'center',
  },
  logoImg: {
    width: 160,
    height: 48,
  },
  // Accent shapes
  bgAccentCircle1: {
    position: 'absolute',
    top: -40,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EA4949',
    opacity: 0.07,
    zIndex: 0,
  },
  bgAccentCircle2: {
    position: 'absolute',
    bottom: -60,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#011030',
    opacity: 0.06,
    zIndex: 0,
  },
  // Shared card style
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#011030',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 0, // remove default margin, use spacers instead
  },
  // Featured event card
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 0,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#011030',
    marginBottom: 2,
  },
  featuredSubtitle: {
    fontSize: 15,
    color: '#EA4949',
  },
  // Block color section
  blockSection: {
    backgroundColor: '#011030',
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowOpacity: 0.09,
  },
  blockAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 6,
    width: '100%',
    backgroundColor: '#EA4949',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  blockSectionText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2,
    textAlign: 'left',
  },
  // Quote/fun fact card
  quoteCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 14,
    alignItems: 'center',
    shadowOpacity: 0.05,
    marginBottom: 0,
  },
  quoteText: {
    color: '#011030',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Section headings
  sectionHeadingRow: {
    marginTop: 22,
    marginBottom: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionAccentBar: {
    width: 6,
    height: 22,
    backgroundColor: '#EA4949',
    borderRadius: 3,
    marginRight: 8,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#011030',
    letterSpacing: 0.5,
  },
  // Tile-based grid styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 0,
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  statTile: {
    width: '47%',
    marginBottom: 12,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  statTileContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTileIcon: {
    marginBottom: 8,
  },
  statTileLabel: {
    color: '#0B1533',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  statTileValue: {
    color: '#E94F4F',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginVertical: 0,
    borderRadius: 1,
  },
  // Badges row
  badgesRow: {
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 16,
    paddingRight: 0,
    flexGrow: 0,
  },
  badgeCard: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#F7F7F7',
  },
  badgeLabel: {
    color: '#EA4949',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 4,
  },
  // Progress bar
  progressBarWrap: {
    marginHorizontal: 16,
    marginBottom: 0,
    marginTop: 0,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    shadowOpacity: 0,
    elevation: 0,
  },
  progressLabel: {
    color: '#011030',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#EA4949',
    borderRadius: 5,
  },
  // Achievements tile
  achievementsTile: {
    backgroundColor: '#011030',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    elevation: 0,
    marginBottom: 0,
  },
  achievementsTileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  achievementsTileIconWrap: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementsTileIconCircle: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B3E0FF',
  },
  achievementsTileTextWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  achievementsTileTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  achievementsTileDesc: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.8,
    flexWrap: 'wrap',
  },
  // Recent activity feed
  activityFeed: {
    marginHorizontal: 16,
    marginBottom: 0,
    marginTop: 0,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#F7F7F7',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  activityText: {
    color: '#011030',
    fontSize: 15,
  },
  // Profile bar styles
  profileBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // changed from #E3F2FD
    marginHorizontal: 0,
    marginBottom: 0,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    elevation: 0,
    shadowOpacity: 0,
  },
  profileAvatar: {
    marginRight: 12,
  },
  profilePicCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#011030',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#B3E0FF',
  },
  profilePicInitial: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profilePicImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  profileQR: {
    marginLeft: 8,
    padding: 4,
  },
  profileSettings: {
    marginLeft: 4,
    padding: 4,
  },
  // GigCards actions card
  gigcardsActionsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 16,
    marginBottom: 0,
  },
  gigcardsActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  gigcardsActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011030',
  },
  gigcardsActionDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E3F2FD',
    marginHorizontal: 12,
    borderRadius: 1,
  },
  // Social actions card
  socialActionsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 16,
    marginBottom: 0,
  },
  socialActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  socialActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011030',
  },
  socialActionDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E3F2FD',
    marginHorizontal: 12,
    borderRadius: 1,
  },
  // View Others' GigCards card
  viewOthersCard: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 16,
    marginBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
  },
  viewOthersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  viewOthersText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011030',
  },
  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EA4949',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#EA4949',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    display: 'flex',
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 36,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  // Spacing utilities
  spacer: {
    height: 10,
  },
  spacerSmall: {
    height: 4,
  },
});