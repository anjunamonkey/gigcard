import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// You can use a QR code library here, e.g. 'react-native-qrcode-svg'
// import QRCode from 'react-native-qrcode-svg';

export default function GigcardQRScreen() {
  // Replace with actual gigcard data
  const gigcardId = 'user-12345';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GigCard QR</Text>
      <Text style={styles.subtitleHeader}>Your GigCard QR Code</Text>
      <View style={styles.qrWrap}>
        {/* Example placeholder icon, replace with QRCode component for real QR */}
        <Ionicons name="qr-code-outline" size={120} color="#EA4949" />
        {/* <QRCode value={gigcardId} size={180} /> */}
      </View>
      <Text style={styles.subtitle}>Scan to share your GigCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // center children horizontally
    justifyContent: 'center',
    padding: 0, // remove padding
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1533',
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'center', // center text
  },
  subtitleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#011030',
    marginBottom: 24,
    textAlign: 'center', // center text
  },
  qrWrap: {
    backgroundColor: '#F7F7F7',
    borderRadius: 18,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    alignSelf: 'center', // center QR code
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
    textAlign: 'center', // already centered
  },
});
