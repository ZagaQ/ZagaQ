import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { Icon, NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import SigninScreen from './components/contents/screen/signin/SigninScreen';
import LoadingScreen from './components/contents/screen/loading/LoadingScreen';
import RegisterScreen from './components/contents/screen/register/RegisterScreen';
import HomeScreen from './components/contents/screen/home/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user?.email) {
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
            {user ? (
              <Tab.Navigator>
                <Tab.Screen 
                  name="Home"
                  component={HomeScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon as={Ionicons} name='home' color={color} size={size} />
                    ),
                  }}
                />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name="Signin" component={SigninScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}

AppRegistry.registerComponent('ZagaQ', () => App);
registerRootComponent(App);
