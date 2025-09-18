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
      <Text style={styles.title}>Your GigCard QR Code</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#011030',
    marginBottom: 24,
  },
  qrWrap: {
    backgroundColor: '#F7F7F7',
    borderRadius: 18,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
    textAlign: 'center',
  },
});
