import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BandsScreen from './src/screens/BandsScreen';
import HomeScreen from './src/screens/HomeScreen';
import TimelineScreen from './src/screens/TimelineScreen';
// import MapScreen from './src/screens/MapScreen';
import AuthStack from './src/screens/Auth/AuthStack';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Time Signature') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Bands') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={28} color={focused ? '#E94F4F' : '#0B1533'} style={focused ? { fontWeight: 'bold' } : {}} />;
        },
        tabBarActiveTintColor: '#E94F4F',
        tabBarInactiveTintColor: '#0B1533',
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 13 },
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 70, paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Time Signature" component={TimelineScreen} options={{ title: 'Timeline' }} />
      <Tab.Screen name="Bands" component={BandsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // TODO: Add auth state logic
  const isSignedIn = false;
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <RootStack.Screen name="Main" component={MainTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
