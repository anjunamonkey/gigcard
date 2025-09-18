# Mobile App (React Native)

## Setup

1. Install dependencies:
   ```sh
   npm install -g expo-cli
   cd app
   expo init .
   npm install axios react-navigation react-native-paper redux react-redux @react-navigation/native @react-navigation/stack
   ```
2. Start the app:
   ```sh
   expo start
   ```

## Structure
- `src/components/` - Reusable UI components
- `src/screens/` - App screens (Home, Timeline, Bands, Map, Memories, Achievements, Profile)
- `src/api/` - API calls
- `src/store/` - Redux or Context state
- `src/navigation/` - Navigation setup

## Notes
- See wireframes and requirements for UI and features.
