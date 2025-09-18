import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
