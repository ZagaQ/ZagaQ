import { AppRegistry } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import RegisterScreen from './components/contents/screen/register/RegisterScreen';
import HomeScreen from './components/contents/screen/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import SigninScreen from './components/contents/screen/signin/SigninScreen';
import LoadingScreen from './components/contents/screen/loading/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user?.email) {
        console.log(user);
        setUser(user.email);
      } else {
        setUser('');
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <LoadingScreen />
        </NativeBaseProvider>
      </SafeAreaProvider>
    )
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {user ? (
                <Stack.Screen name="Home" component={HomeScreen} />
              ) : (
                <>
                  <Stack.Screen name="Signin" component={SigninScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}

AppRegistry.registerComponent('ZagaQ', () => App);