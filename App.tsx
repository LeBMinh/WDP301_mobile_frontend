import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import HomeTabs from './components/navigation/HomeTabs';
import VaccineDetail from './components/pages/VaccinDetail';
import CreateBabyProfile from './components/pages/CreateBabyProfile';
import UpdateProfile from './components/pages/UpdateProfile';
import BabyProfile from './components/pages/BabyProfile';
import PaymentHistory from './components/pages/PaymentHistory';

const Stack = createStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          // If signed in, go to HomeTabs (Main App)
          <>
            <Stack.Screen name="MainPage">
              {() => <HomeTabs setIsSignedIn={setIsSignedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="VaccineDetail" component={VaccineDetail} />
            <Stack.Screen name="CreateBabyProfile" component={CreateBabyProfile} />
            {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} /> */}
            <Stack.Screen name="BabyProfile" component={BabyProfile} />
            <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
          </>
        ) : (
          // If NOT signed in, show authentication screens
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignIn {...props} setIsSignedIn={setIsSignedIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
