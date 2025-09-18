import { Redirect } from 'expo-router';

// This is the entry point of the app
// For now, redirect to auth. In a real app, you'd check if user is logged in
export default function Index() {
  // TODO: Check if user is authenticated
  const isAuthenticated = false; // This would come from your auth state
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/(auth)/sign-in" />;
}
