import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  // Editable profile state
  const [name, setName] = useState('Luc');
  const [email, setEmail] = useState('luc@email.com');
  const [profilePhoto, setProfilePhoto] = useState(null); // Placeholder for image URI

  // Privacy controls
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [isDataSharingEnabled, setIsDataSharingEnabled] = useState(false);

  // Country translation toggle
  const [translateCountries, setTranslateCountries] = useState(false);

  const handleLogout = () => {
    // TODO: Clear auth state
    router.replace('/(auth)/sign-in');
  };

  const handleChangePhoto = () => {
    // TODO: Add image picker logic
    Alert.alert('Change Photo', 'Image picker logic goes here.');
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen or show modal
    Alert.alert('Change Password', 'Password change logic goes here.');
  };

  const handleClearCache = () => {
    // TODO: Clear cache/reset app data logic
    Alert.alert('Clear Cache', 'App data has been reset.');
  };

  const handleContactSupport = () => {
    // TODO: Open support/contact options
    Alert.alert('Contact Support', 'Support contact options go here.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileCard}>
        {/* Profile picture */}
        <TouchableOpacity style={styles.profilePicWrap} onPress={handleChangePhoto}>
          <View style={styles.profilePicCircle}>
            {/* Placeholder image or initial */}
            {profilePhoto ? (
              // TODO: Render Image component with profilePhoto URI
              <Text style={styles.profilePicInitial}>IMG</Text>
            ) : (
              <Text style={styles.profilePicInitial}>{name.charAt(0).toUpperCase()}</Text>
            )}
          </View>
          <Text style={styles.profilePicLink}>Change photo</Text>
        </TouchableOpacity>
        {/* Editable name */}
        <TextInput
          style={styles.profileNameInput}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        {/* Editable email */}
        <TextInput
          style={styles.profileEmailInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Text style={styles.profileLocation}>London, United Kingdom</Text>
        {/* Change password button */}
        <TouchableOpacity style={styles.changePasswordBtn} onPress={handleChangePassword}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Privacy Controls Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeading}>PRIVACY</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>👁️</Text></View>
            <Text style={styles.settingsLabel}>Profile Visibility</Text>
            <Switch
              value={isProfilePublic}
              onValueChange={setIsProfilePublic}
              trackColor={{ false: '#eee', true: '#011030' }}
              thumbColor="#fff"
              style={{ marginLeft: 12 }}
            />
          </View>
          <View style={styles.settingsDivider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>🔗</Text></View>
            <Text style={styles.settingsLabel}>Data Sharing</Text>
            <Switch
              value={isDataSharingEnabled}
              onValueChange={setIsDataSharingEnabled}
              trackColor={{ false: '#eee', true: '#011030' }}
              thumbColor="#fff"
              style={{ marginLeft: 12 }}
            />
          </View>
        </View>
        <Text style={styles.settingsDesc}>
          Control who can see your profile and whether your data is shared for analytics.
        </Text>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeading}>SETTINGS</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>⚙️</Text></View>
            <Text style={styles.settingsLabel}>Open in Settings App</Text>
          </View>
          <View style={styles.settingsDivider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>⭐</Text></View>
            <Text style={styles.settingsLabel}>Achievements</Text>
            <View style={styles.settingsToggleOn} />
          </View>
          <View style={styles.settingsDivider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>🏳️</Text></View>
            <Text style={styles.settingsLabel}>Translate Countries</Text>
            <Switch
              value={translateCountries}
              onValueChange={setTranslateCountries}
              trackColor={{ false: '#eee', true: '#011030' }}
              thumbColor="#fff"
              style={{ marginLeft: 12 }}
            />
          </View>
        </View>
        <Text style={styles.settingsDesc}>Enable to translate country names to preferred device language.</Text>
      </View>

      {/* Clear Cache / Reset Data */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeading}>DATA</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsRow} onPress={handleClearCache}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>🗑️</Text></View>
            <Text style={styles.settingsLabel}>Clear Cache / Reset App Data</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.settingsDesc}>This will clear cached data and reset the app to default settings.</Text>
      </View>

      {/* Help & Support */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeading}>HELP & SUPPORT</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsRow} onPress={handleContactSupport}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>💬</Text></View>
            <Text style={styles.settingsLabel}>Contact Support</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.settingsDesc}>Need help? Contact our support team for assistance.</Text>
      </View>

      {/* About / App Version Info */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeading}>ABOUT</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}><Text style={styles.settingsIcon}>ℹ️</Text></View>
            <Text style={styles.settingsLabel}>App Version</Text>
            <Text style={styles.settingsVersion}>1.0.0</Text>
          </View>
        </View>
        <Text style={styles.settingsDesc}>GigCard © 2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#0B1533' },
  profileCard: { 
    backgroundColor: '#f5f5f5', 
    borderRadius: 12, 
    padding: 24, 
    alignItems: 'center', 
    marginBottom: 24 
  },
  profilePicWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#011030',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  profilePicInitial: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profilePicLink: {
    color: '#011030',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  profileName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#0B1533' },
  profileEmail: { color: '#888', marginBottom: 4 },
  profileLocation: { color: '#0B1533', fontWeight: 'bold' },
  logoutBtn: { 
    backgroundColor: '#E94F4F', 
    borderRadius: 8, 
    padding: 16, 
    alignItems: 'center' 
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  settingsSection: { marginTop: 32 },
  settingsHeading: { color: '#888', fontWeight: 'bold', fontSize: 13, marginBottom: 8, marginLeft: 4 },
  settingsCard: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 0, marginBottom: 8 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16 },
  settingsIconWrap: { width: 32, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  settingsIcon: { fontSize: 22 },
  settingsLabel: { flex: 1, fontSize: 16, color: '#222', fontWeight: '500' },
  settingsDivider: { height: 1, backgroundColor: '#eee', marginHorizontal: 16 },
  settingsToggleOn: {
    width: 38,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#011030',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 12,
    position: 'relative',
  },
  settingsToggleOff: {
    width: 38,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 12,
    position: 'relative',
  },
  settingsToggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#011030',
    shadowOpacity: 0.12,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  settingsDesc: { color: '#888', fontSize: 13, marginLeft: 4, marginBottom: 16 },
  profileNameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0B1533',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  profileEmailInput: {
    color: '#888',
    marginBottom: 4,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  changePasswordBtn: {
    marginTop: 8,
    backgroundColor: '#011030',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  changePasswordText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  settingsVersion: {
    fontSize: 15,
    color: '#888',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
