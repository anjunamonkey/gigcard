import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Band = {
  name: string;
  genre: string;
  date: string;
  timesSeen: number;
  image: any;
  favourite?: boolean;
};


interface BandsListProps {
  bands: Band[];
  onBandPress?: (band: Band) => void;
  onFavouriteToggle?: (band: Band, isFavourite: boolean) => void;
}

export default function BandsList({ bands, onBandPress, onFavouriteToggle }: BandsListProps) {
  const [favourites, setFavourites] = useState<{ [name: string]: boolean }>(
    bands.reduce((acc: { [name: string]: boolean }, band: Band) => {
      acc[band.name] = !!band.favourite;
      return acc;
    }, {})
  );

  const handleFavourite = (band: Band) => {
    const isFav = !favourites[band.name];
    setFavourites(prev => ({ ...prev, [band.name]: isFav }));
    if (onFavouriteToggle) {
      onFavouriteToggle(band, isFav);
    }
  };

  return (
    <FlatList
      data={bands}
      keyExtractor={item => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.bandCard} onPress={() => onBandPress?.(item)}>
          <Image source={item.image} style={styles.bandImage} />
          <View style={styles.bandInfo}>
            <Text style={styles.bandName}>{item.name}</Text>
            <Text style={styles.bandGenre}>{item.genre}</Text>
            <Text style={styles.bandDate}>Last seen: {item.date}</Text>
          </View>
          <View style={styles.gigCountBadge}><Text style={styles.gigCountText}>{item.timesSeen} GIGS</Text></View>
          <TouchableOpacity
            style={styles.favIcon}
            onPress={() => handleFavourite(item)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={favourites[item.name] ? 'heart' : 'heart-outline'}
              size={22}
              color={favourites[item.name] ? '#EA4949' : '#888'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}


const styles = StyleSheet.create({
  bandCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#011030',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  bandImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 18,
    backgroundColor: '#eee',
  },
  bandInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bandName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#101526',
    marginBottom: 2,
  },
  bandGenre: {
    fontSize: 15,
    color: '#888',
    marginBottom: 0,
    fontWeight: '500',
  },
  bandDate: {
    fontSize: 15,
    color: '#888',
    marginBottom: 0,
    fontWeight: '400',
  },
  gigCountBadge: {
    position: 'absolute',
    right: 54,
    top: 24,
    backgroundColor: '#101526',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
  },
  favIcon: {
    position: 'absolute',
    right: 18,
    top: 22,
    zIndex: 2,
    padding: 4,
  },
  gigCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
