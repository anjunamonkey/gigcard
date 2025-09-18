import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/images/logo-alt.png')}
          style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: 24 }}
        />
        <Text style={styles.logoText}>gigcard</Text>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.description}>
          Keep track of the concerts you’ve been to. Visualise your concert history and favourite gigs in one place.
        </Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1533',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    letterSpacing: 1,
  },
  bottomContent: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  signInBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 60,
    alignItems: 'center',
    width: '85%',
  },
  signInText: {
    color: '#5A2A5A',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
